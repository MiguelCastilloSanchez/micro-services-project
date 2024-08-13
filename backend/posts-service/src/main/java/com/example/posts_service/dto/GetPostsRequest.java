package com.example.posts_service.dto;

import java.time.ZonedDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class GetPostsRequest {
    private Long id;
    private String artist;
    private String song;
    private String review;
    private Long userId;
    private ZonedDateTime createdAt;


}


