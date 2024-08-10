package com.example.posts_service.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {

    @NotEmpty(message = "Song is required")
    @Size(min = 1, max = 40, message = "Song must be at most 40 characters long")
    private String song;

    @NotEmpty(message = "Artist is required")
    @Size(min = 1, max = 40, message = "Artist must be at most 40 characters long")
    private String artist;

    @NotEmpty(message = "Review is required")
    @Size(min = 1, max = 300, message = "Review cannot exceed 300 characters")
    private String review;

    public String getSong() {
        return song;
    }

    public void setSong(String song) {
        this.song = song;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
    
}