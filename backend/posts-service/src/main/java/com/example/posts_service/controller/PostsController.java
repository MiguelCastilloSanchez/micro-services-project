package com.example.posts_service.controller;

import com.example.posts_service.dto.CreatePostRequest;
import com.example.posts_service.dto.GetLikesRequest;
import com.example.posts_service.dto.GetPostsRequest;
import com.example.posts_service.model.Like;
import com.example.posts_service.model.Post;
import com.example.posts_service.service.LikeService;
import com.example.posts_service.service.PostService;
import com.example.posts_service.util.JwtUtil;
import jakarta.validation.Valid;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
public class PostsController {

    private final JwtUtil jwtUtil;
    private final PostService postService;
    private final LikeService likeService;

    @Autowired
    public PostsController(JwtUtil jwtUtil, PostService postService, LikeService likeService) {
        this.jwtUtil = jwtUtil;
        this.postService = postService;
        this.likeService = likeService;
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
        post.setCreatedAt(ZonedDateTime.now());
        
        postService.createPost(post);

        return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully");
    }

    @GetMapping("/all-posts/{page}")
    public ResponseEntity<Page<GetPostsRequest>> getAllPostsPaginated(
        @PathVariable int page
    ) {
        int size = 10;
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<GetPostsRequest> postsPage = postService.getAllPostsPaginated(pageable);
        return ResponseEntity.ok(postsPage);
    }

    @GetMapping("/all-likes/{postId}")
    public ResponseEntity<List<Long>> getAllLikes(@PathVariable Long postId) {
        List<Like> likes = likeService.getAllLikes();
        
        List<Long> userIds = likes.stream()
            .filter(like -> like.getPost().getId().equals(postId))
            .map(Like::getUserId)
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(userIds);
    }
    
    @PostMapping("/like/{postId}")
    public ResponseEntity<String> likePost(@PathVariable Long postId, @RequestHeader("Authorization") String token) {
        if (!postService.doesPostExist(postId)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Post not found");
        }

        String cleanedToken = token.substring(7);
        Long userId = jwtUtil.extractUserId(cleanedToken);

        if (likeService.hasUserLikedPost(userId, postId)) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Error: User already liked the post");
        }
        likeService.likePost(userId, postId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Post liked successfully");
    }

    @DeleteMapping("/unlike/{postId}")
    public ResponseEntity<String> unlikePost(@PathVariable Long postId, @RequestHeader("Authorization") String token) {
        if (!postService.doesPostExist(postId)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Post not found");
        }

        String cleanedToken = token.substring(7);
        Long userId = jwtUtil.extractUserId(cleanedToken);

        if (!likeService.hasUserLikedPost(userId, postId)) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Error: User has not liked the post");
        }
        likeService.unlikePost(userId, postId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Post unliked successfully");
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(
        @PathVariable Long postId,
        @RequestHeader("Authorization") String token) {
    
        if (!postService.doesPostExist(postId)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Post not found");
        }

        String cleanedToken = token.substring(7);
        Long userId = jwtUtil.extractUserId(cleanedToken);

        boolean isDeleted = postService.deletePostByIdAndUserId(postId, userId);

        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Post deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Not the owner of the post LOL");
        }
    }
}
