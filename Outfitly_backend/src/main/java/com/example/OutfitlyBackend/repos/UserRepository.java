package com.example.OutfitlyBackend.repos;

import com.example.OutfitlyBackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
