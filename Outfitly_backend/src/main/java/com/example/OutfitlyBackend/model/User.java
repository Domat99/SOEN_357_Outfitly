package com.example.OutfitlyBackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;
    private String gender;
    private BodyMetrics bodyMetrics;
    private List<ClosetItem> closetImages;


    public User() {}


    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public BodyMetrics getBodyMetrics() { return bodyMetrics; }
    public void setBodyMetrics(BodyMetrics bodyMetrics) { this.bodyMetrics = bodyMetrics; }

    public List<ClosetItem> getClosetImages() {
        return closetImages;
    }

    public void setClosetImages(List<ClosetItem> closetImages) {
        this.closetImages = closetImages;
    }
}
