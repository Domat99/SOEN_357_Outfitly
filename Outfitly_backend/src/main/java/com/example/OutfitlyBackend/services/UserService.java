package com.example.OutfitlyBackend.services;

import com.example.OutfitlyBackend.model.ClosetItem;
import com.example.OutfitlyBackend.model.User;
import com.example.OutfitlyBackend.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
}

