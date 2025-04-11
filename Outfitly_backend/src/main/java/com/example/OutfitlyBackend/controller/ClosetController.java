package com.example.OutfitlyBackend.controller;


import com.example.OutfitlyBackend.model.ClosetItem;
import com.example.OutfitlyBackend.services.ClosetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/closet")
@CrossOrigin(origins = "http://localhost:3000")
public class ClosetController {

    @Autowired
    private ClosetService closetService;

    @GetMapping("/closet/{userId}")
    public List<ClosetItem> getUserCloset(@PathVariable String userId) {
        return closetService.getClosetForUser(userId);
    }
}
