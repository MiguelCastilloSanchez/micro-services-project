package com.example.auth_service.controller;

import com.example.auth_service.dto.UpdatePasswordRequest;
import com.example.auth_service.dto.UpdateUsernameRequest;
import com.example.auth_service.model.User;
import com.example.auth_service.service.TokenService;
import com.example.auth_service.service.UserService;
import com.example.auth_service.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TokenService tokenService;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return "Error: Username is already taken";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User loginRequest) {
        User user = userService.findByUsername(loginRequest.getUsername());
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return response;
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }

    @PostMapping("/update-username")
    public String updateUsername(@RequestBody UpdateUsernameRequest request, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (userService.findByUsername(request.getNewUsername()) != null) {
            return "Error: Username is already taken";
        }
        user.setUsername(request.getNewUsername());
        userService.saveUser(user);
        return "Username updated successfully";
    }

    @PostMapping("/update-password")
    public String updatePassword(@RequestBody UpdatePasswordRequest request, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return "Error: Old password is incorrect";
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userService.saveUser(user);
        return "Password updated successfully";
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            tokenService.revokeToken(jwt);
        }
        return ResponseEntity.ok("Logout successful");
    }

    @PostMapping("/delete")
    public String deleteUser(Principal principal) {
        userService.deleteUser(principal.getName());
        return "User deleted successfully";
    }
}
