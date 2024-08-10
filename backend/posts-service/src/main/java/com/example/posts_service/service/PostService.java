package com.example.posts_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.posts_service.exception.PostNotFoundException;
import com.example.posts_service.model.Post;
import com.example.posts_service.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("Post with ID " + postId + " not found"));
    }
    
    public boolean deletePostByIdAndUserId(Long postId, Long userId) {
        Post post = getPostById(postId);
    
        if (post.getUserId().equals(userId)) {
            postRepository.deleteById(postId);
            return true;
        } else {
            return false;
        }
    }
    

    public boolean doesPostExist(Long postId) {
        return postRepository.existsById(postId);
    }
}

