package com.example.OutfitlyBackend.services;

import com.example.OutfitlyBackend.model.ClosetItem;
import com.example.OutfitlyBackend.model.User;
import com.example.OutfitlyBackend.repos.ClosetItemRepository;
import com.example.OutfitlyBackend.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClosetItemRepository closetItemRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password)); // Replace with hashed check in production
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public List<ClosetItem> getClosetByEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.map(User::getClosetImages).orElse(null);
    }

    public ClosetItem addItemToUserCloset(String userId, ClosetItem newItem) {
        // Save the item to the ClosetItem collection (with userId attached)
        newItem.setUserId(userId);
        ClosetItem savedItem = closetItemRepository.save(newItem);

        // Also update the User's closetImages list
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<ClosetItem> userCloset = user.getClosetImages();
            if (userCloset != null) {
                userCloset.add(savedItem);
            } else {
                user.setClosetImages(List.of(savedItem));
            }
            userRepository.save(user);
        }

        return savedItem;
    }

    public User updateUser(String id, User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            // Update fields you want to allow
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            // Update bodyMetrics if provided
            existingUser.setBodyMetrics(updatedUser.getBodyMetrics());
            // Note: Ensure that any field (like colorPalette) you reference in the frontend
            // actually exists in the model.
            return userRepository.save(existingUser);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
