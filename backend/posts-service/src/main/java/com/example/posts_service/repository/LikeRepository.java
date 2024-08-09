package com.example.posts_service.repository;

import com.example.posts_service.model.Like;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Like findByUserIdAndPostId(Long userId, Long postId);
    List<Like> findByPostId(Long postId);
    List<Like> findByUserId(Long userId);
}

