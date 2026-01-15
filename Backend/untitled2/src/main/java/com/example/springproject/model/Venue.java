package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "venue")
public class Venue {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String venue_Code;
    private String name;
    private int capacity;
    private int type;
    private int preference;
    private String location;
    private int college_id;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getVenue_Code() {
        return venue_Code;
    }

    public void setVenue_Code(String venue_Code) {
        this.venue_Code = venue_Code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getPreference() {
        return preference;
    }

    public void setPreference(int preference) {
        this.preference = preference;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCollege_id() {
        return college_id;
    }

    public void setCollege_id(int college_id) {
        this.college_id = college_id;
    }
}
