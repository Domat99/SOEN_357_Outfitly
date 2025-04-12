package com.example.OutfitlyBackend.controller;

import com.example.OutfitlyBackend.model.ClosetItem;
import com.example.OutfitlyBackend.model.User;
import com.example.OutfitlyBackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Optional<User> login(@RequestBody User loginRequest) {
        return userService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @GetMapping("/closet")
    public List<ClosetItem> getClosetByEmail(@RequestParam String email) {
        return userService.getClosetByEmail(email);
    }

    @PostMapping("/{userId}/closet")
    public ClosetItem addClosetItemToUser(@PathVariable String userId, @RequestBody ClosetItem item) {
        return userService.addItemToUserCloset(userId, item);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }
}
