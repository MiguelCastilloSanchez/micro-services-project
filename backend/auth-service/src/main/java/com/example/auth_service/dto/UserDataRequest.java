package com.example.auth_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDataRequest {
    private Long id;
    private String username;
    private String profilePhotoName;
    private String profilePhotoThumbnail;  // ase64 encoded

}

