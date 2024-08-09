package com.example.posts_service.controller;

import com.example.posts_service.dto.CreatePostRequest;
import com.example.posts_service.model.Post;
import com.example.posts_service.service.PostService;
import com.example.posts_service.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
public class PostsController {

    private final JwtUtil jwtUtil;
    private final PostService postService;

    @Autowired
    public PostsController(JwtUtil jwtUtil, PostService postService) {
        this.jwtUtil = jwtUtil;
        this.postService = postService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPost(
            @Valid @RequestBody CreatePostRequest request, 
            BindingResult bindingResult, 
            @RequestHeader("Authorization") String token) {

        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            bindingResult.getAllErrors().forEach(error -> errors.append(error.getDefaultMessage()).append(" "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + errors.toString());
        }

        String cleanedToken = token.substring(7);
        Long userId = jwtUtil.extractUserId(cleanedToken);

        Post post = new Post();
        post.setUserId(userId);
        post.setArtist(request.getArtist());
        post.setSong(request.getSong());
        post.setReview(request.getReview());

        Post newPost = postService.createPost(post);

        return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully with ID: " + newPost.getId());
    }
}
