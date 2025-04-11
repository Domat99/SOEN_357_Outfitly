package com.example.OutfitlyBackend.controller;


import com.example.OutfitlyBackend.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:3000")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping
    public Map<String, Object> getWeather(
            @RequestParam("lat") double lat,
            @RequestParam("lon") double lon) {
        return weatherService.fetchWeather(lat, lon);
    }
}
