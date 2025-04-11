package com.example.OutfitlyBackend.controller;

import com.example.OutfitlyBackend.model.OutfitRequest;
import com.example.OutfitlyBackend.model.ClosetItem;
import com.example.OutfitlyBackend.services.ClosetService;
import com.example.OutfitlyBackend.services.OutfitService;
import com.example.OutfitlyBackend.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/outfit")
@CrossOrigin(origins = "http://localhost:3000")
public class OutfitController {

    @Autowired
    private ClosetService closetService;

    @Autowired
    private OutfitService outfitService;

    @Autowired
    private WeatherService weatherService;

    @PostMapping("/generate")
    public List<ClosetItem> generateOutfit(@RequestBody OutfitRequest request) {
        Map<String, Object> weatherData = weatherService.fetchWeather(request.getLat(), request.getLon());

        String condition = (String) weatherData.get("condition");
        double temperature = (double) weatherData.get("temperature");

        List<ClosetItem> closetItems = closetService.getClosetForUser(request.getUserId());

        return outfitService.generateOutfit(
                closetItems,
                request.getStyleType(),
                condition,
                temperature,
                request.getHeight(),
                request.getWeight(),
                request.getChest(),
                request.getWaist(),
                request.getHips(),
                request.getShoulders()
        );
    }
}
