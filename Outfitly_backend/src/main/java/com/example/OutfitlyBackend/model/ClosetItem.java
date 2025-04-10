package com.example.OutfitlyBackend.model;

import java.util.List;

public class ClosetItem {

    private String name;        // e.g., "Black Hoodie"
    private String link;        // Cloudinary URL
    private String status;      // e.g., "clean", "dirty", "favorite"
    private List<String> tags;  // e.g., ["hoodie", "casual", "warm"]
    private String weather;     // e.g., "cold", "rainy", "sunny"
    private String size;        // e.g., "M", "L", "S"

    public ClosetItem() {}

    // Getters and Setters

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getWeather() { return weather; }
    public void setWeather(String weather) { this.weather = weather; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
}
