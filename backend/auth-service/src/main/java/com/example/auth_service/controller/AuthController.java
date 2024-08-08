package com.example.auth_service.controller;

import com.example.auth_service.dto.RegisterUserRequest;
import com.example.auth_service.dto.UpdatePasswordRequest;
import com.example.auth_service.model.User;
import com.example.auth_service.service.TokenService;
import com.example.auth_service.service.UserService;
import com.example.auth_service.util.JwtUtil;

import jakarta.validation.Valid;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.security.Principal;
import java.util.HashMap;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import com.example.auth_service.util.PathUtil;
import org.springframework.core.io.Resource;


@RestController
@RequestMapping("/user")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TokenService tokenService;

    private static final String[] EXTENSIONS = {"jpg", "jpeg", "png"};
    private static final String UPLOAD_DIR = "/app/profile-photos/";
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(EXTENSIONS);

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterUserRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errors.append(error.getDefaultMessage()).append(" "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + errors.toString());
        }
        if (userService.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Username is already taken");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User loginRequest) {
        User user = userService.findByUsername(loginRequest.getUsername());
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
        }
    }

    @PostMapping("/upload-profile-photo")
    public ResponseEntity<String> uploadProfilePhoto(@RequestParam("file") MultipartFile file, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found");
        }

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: File is empty");
        }

        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(fileExtension.toLowerCase())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: File type is not supported. Only JPG, JPEG, and PNG are allowed.");
        }

        if (file.getSize() > 4 * 1024 * 1024) { // 4 MB
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: File size exceeds 4 MB limit.");
        }

        try {
            String fileName = PathUtil.cleanPath(file.getOriginalFilename());
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            if (user.getProfilePhoto() != null) {
                Path oldFilePath = Paths.get(UPLOAD_DIR).resolve(user.getProfilePhoto());
                Files.deleteIfExists(oldFilePath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/user/profile-photos/")
                    .path(fileName)
                    .toUriString();

            user.setProfilePhoto(fileName);
            userService.saveUser(user);

            return ResponseEntity.ok("Profile photo uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Could not upload file");
        }
    }

    @GetMapping("/profile-photo")
    public ResponseEntity<Resource> getProfilePhoto(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    
        String profilePhotoUrl = user.getProfilePhoto();
        if (profilePhotoUrl == null || profilePhotoUrl.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    
        try {
            Path file = Paths.get(UPLOAD_DIR).resolve(profilePhotoUrl.substring(profilePhotoUrl.lastIndexOf("/") + 1));
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/profile-photo-url")
    public ResponseEntity<String> getProfilePhotoUrl(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (user == null || user.getProfilePhoto() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User or profile photo not found");
        }

        return ResponseEntity.ok(user.getProfilePhoto());
    }

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@Valid @RequestBody UpdatePasswordRequest request, BindingResult bindingResult, Principal principal) { 
        User user = userService.findByUsername(principal.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found");
        }
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Old password is incorrect");
        }
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errors.append(error.getDefaultMessage()).append(" "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + errors.toString());
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userService.saveUser(user);
        return ResponseEntity.ok("Password updated successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            tokenService.revokeToken(jwt);
        }
        return ResponseEntity.ok("Logout successful");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(Principal principal) {
        String username = principal.getName();
        User user = userService.findByUsername(username);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found");
        }
        
        userService.deleteUser(username);
        return ResponseEntity.ok("User deleted successfully");
    }

}
