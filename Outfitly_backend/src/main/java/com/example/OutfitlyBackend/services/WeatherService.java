package com.example.OutfitlyBackend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.util.Map;

@Service
public class WeatherService {

    public Map<String, Object> fetchWeather(double lat, double lon) {
        String url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
                "&longitude=" + lon + "&current_weather=true";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);

        JSONObject data = new JSONObject(result);
        JSONObject current = data.getJSONObject("current_weather");

        int weatherCode = current.getInt("weathercode");

        return Map.of(
                "temperature", current.getDouble("temperature"),
                "condition", mapCondition(weatherCode),
                "humidity", 60, // Static for now
                "wind", current.getDouble("windspeed") + " km/h"
        );
    }

    private String mapCondition(int code) {
        return switch (code) {
            case 0 -> "Clear";
            case 1, 2 -> "Partly Cloudy";
            case 3 -> "Cloudy";
            case 45, 48 -> "Fog";
            case 51, 53, 55 -> "Light Drizzle";
            case 56, 57 -> "Freezing Drizzle";
            case 61 -> "Slight Rain";
            case 63 -> "Moderate Rain";
            case 65 -> "Heavy Rain";
            case 66, 67 -> "Freezing Rain";
            case 71 -> "Slight Snowfall";
            case 73 -> "Moderate Snowfall";
            case 75 -> "Heavy Snowfall";
            case 80, 81, 82 -> "Rain Showers";
            case 85, 86 -> "Snow Showers";
            case 95 -> "Thunderstorm";
            case 96, 99 -> "Thunderstorm with Hail";
            default -> "Unknown";
        };
    }
}
