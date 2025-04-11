package com.example.OutfitlyBackend.services;


import com.example.OutfitlyBackend.model.ClosetItem;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OutfitService {

    public String determineSize(double height, double weight, double chest, double waist, double hips, double shoulders) {
        double avg = (chest + waist + hips + shoulders) / 4.0;
        if (height < 160 || weight < 55 || avg < 90) return "S";
        if (height <= 175 && weight <= 75 && avg <= 105) return "M";
        return "L";
    }

    private String simplifyWeather(String condition, double temperature) {
        condition = condition.toLowerCase();

        if (condition.contains("rain") || condition.contains("shower") || condition.contains("drizzle")) {
            return "rainy";
        }

        if (condition.contains("wind") || condition.contains("active")) {
            return "cloudy"; // Or "windy" if you want to make it more specific
        }

        if (temperature >= 23) return "sunny";
        if (temperature < 12) return "cold";
        return "cloudy";
    }


    public List<ClosetItem> generateOutfit(List<ClosetItem> allItems, String styleType, String weatherCondition, double temperature,
                                           double height, double weight, double chest, double waist, double hips, double shoulders) {

        String size = determineSize(height, weight, chest, waist, hips, shoulders);
        String simplifiedWeather = simplifyWeather(weatherCondition, temperature);

        Map<String, ClosetItem> outfit = new HashMap<>();

        for (ClosetItem item : allItems) {
            String type = item.getType();
            boolean isAccessory = type != null && type.equalsIgnoreCase("Accessories");

            boolean matchesType = item.getTags() != null &&
                    item.getTags().stream().anyMatch(tag -> tag.equalsIgnoreCase(styleType));

            boolean matchesWeather = isAccessory ||
                    item.getWeather() == null ||
                    item.getWeather().equalsIgnoreCase("any") ||
                    simplifyWeather(item.getWeather(), temperature).equalsIgnoreCase(simplifiedWeather);

            boolean matchesSize = isAccessory || size.equalsIgnoreCase(item.getSize());

            if (matchesType && matchesWeather && matchesSize) {
                switch (type) {
                    case "Shirts" -> outfit.putIfAbsent("Shirts", item);
                    case "Layers" -> {
                        if (simplifiedWeather.equals("cold") || simplifiedWeather.equals("rainy")) {
                            outfit.putIfAbsent("Layers", item);
                        }
                    }
                    case "Pants" -> outfit.putIfAbsent("Pants", item);
                    case "Shoes" -> outfit.putIfAbsent("Shoes", item);
                    case "Accessories" -> outfit.putIfAbsent("Accessories", item);
                }

                System.out.println("✅ MATCHED: " + item.getName() + " (" + type + ")");
            } else {
                System.out.println("Skipping item: " + item.getName() +
                        " | Type: " + type +
                        " | Size match: " + matchesSize +
                        " | Tag match: " + matchesType +
                        " | Weather match: " + matchesWeather);
            }
        }

        return outfit.values().stream().toList();
    }

}
