package com.example.OutfitlyBackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "closet_items")
public class ClosetItem {

    @Id
    private String id;
    private String name;
    private String type;
    private String link;
    private String status;
    private List<String> tags;
    private String weather;
    private String size;
    private String userId;

    public ClosetItem() {}

    public ClosetItem(String name, String type, String link, String status, List<String> tags, String weather, String size, String userId) {
        this.name = name;
        this.type = type;
        this.link = link;
        this.status = status;
        this.tags = tags;
        this.weather = weather;
        this.size = size;
        this.userId = userId;
    }


    public String getType() {return type;}

    public void setType(String type) {this.type = type;}

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

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}

