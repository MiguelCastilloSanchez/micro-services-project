package com.example.posts_service.repository;

import com.example.posts_service.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);
    boolean existsById(Long postId);
    void deleteById(Long postId);
}

