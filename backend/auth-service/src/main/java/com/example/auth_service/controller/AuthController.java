package com.example.auth_service.controller;

import com.example.auth_service.model.User;
import com.example.auth_service.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Error: Username is already taken";
        }else{
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
        }
    }

    @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody User loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Aquí se devuelve un token JWT
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            return response;
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }

}
