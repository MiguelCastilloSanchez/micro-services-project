package com.example.posts_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.posts_service.model.Like;
import com.example.posts_service.repository.LikeRepository;


@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    public Like likePost(Long userId, Long postId) {
        Like like = new Like();
        like.setUserId(userId);
        return likeRepository.save(like);
    }

    public void unlikePost(Long userId, Long postId) {
        Like like = likeRepository.findByUserIdAndPostId(userId, postId);
        if (like != null) {
            likeRepository.delete(like);
        }
    }
}

