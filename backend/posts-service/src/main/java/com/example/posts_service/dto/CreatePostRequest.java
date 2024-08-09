package com.example.posts_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {

    @NotEmpty(message = "Song is required")
    @Size(min = 1, max = 20, message = "Song must be at most 20 characters long")
    private String song;

    @NotEmpty(message = "Artist is required")
    @Size(min = 1, max = 20, message = "Artist must be at most 20 characters long")
    private String artist;

    @NotEmpty(message = "Review is required")
    @Email(message = "Email must be between 10 and 200 characters")
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