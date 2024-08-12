package com.example.posts_service.service;

import com.example.posts_service.model.Like;
import com.example.posts_service.model.Post;
import com.example.posts_service.repository.LikeRepository;
import com.example.posts_service.repository.PostRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, PostRepository postRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
    }

    public boolean hasUserLikedPost(Long userId, Long postId) {
        return likeRepository.existsByUserIdAndPostId(userId, postId);
    }

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    public Like likePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));
        Like like = new Like();
        like.setUserId(userId);
        like.setPost(post);

        return likeRepository.save(like);
    }

    public void unlikePost(Long userId, Long postId) {
        Like like = likeRepository.findByUserIdAndPostId(userId, postId);
        likeRepository.delete(like);
    }
}
