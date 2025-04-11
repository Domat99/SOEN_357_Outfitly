package com.example.OutfitlyBackend.repos;

import com.example.OutfitlyBackend.model.ClosetItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClosetItemRepository extends MongoRepository<ClosetItem, String> {
    List<ClosetItem> findByUserId(String userId);
    List<ClosetItem> findByUserIdIsNull();
    List<ClosetItem> findByUserIdOrUserIdIsNull(String userId);
}
