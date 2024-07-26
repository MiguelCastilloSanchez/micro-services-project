package com.example.auth_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateUsernameRequest {

    @NotBlank(message = "New username is required")
    @Size(min = 3, max = 30, message = "New username must be between 3 and 30 characters long")
    private String newUsername;

    public String getNewUsername() {
        return newUsername;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }
}
