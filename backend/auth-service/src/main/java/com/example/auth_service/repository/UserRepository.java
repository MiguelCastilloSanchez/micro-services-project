package com.example.auth_service.repository;

import com.example.auth_service.model.User;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsById(Long postId);
    User getById(Long id);
    void deleteByUsername(String username);
}
