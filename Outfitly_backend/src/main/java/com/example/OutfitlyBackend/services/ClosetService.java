package com.example.OutfitlyBackend.services;

import com.example.OutfitlyBackend.model.ClosetItem;
import com.example.OutfitlyBackend.repos.ClosetItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClosetService {

    @Autowired
    private ClosetItemRepository closetItemRepository;


    public List<ClosetItem> getClosetForUser(String userId) {
        return closetItemRepository.findByUserIdOrUserIdIsNull(userId);
    }
}
