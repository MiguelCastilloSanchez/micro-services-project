package com.example.auth_service.service;

import com.example.auth_service.model.User;
import com.example.auth_service.repository.UserRepository;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private static final int THUMBNAIL_SIZE = 100;

    public String generateThumbnail(String imagePath) throws IOException {
        Path path = Paths.get(imagePath);
        BufferedImage img = ImageIO.read(path.toFile());

        BufferedImage thumbnail = Scalr.resize(img, Scalr.Method.QUALITY, Scalr.Mode.AUTOMATIC, THUMBNAIL_SIZE, THUMBNAIL_SIZE);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(thumbnail, "jpg", baos);

        return Base64.getEncoder().encodeToString(baos.toByteArray());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean userExistsById(Long id){
        return userRepository.existsById(id);
    }

    public User getUserById(Long id) {
        return userRepository.getById(id);
    }

    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            userRepository.delete(user);
        }
    }
}
