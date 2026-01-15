package com.example.springproject.controller;

import com.example.springproject.model.Venue;
import com.example.springproject.repository.Venuerepo;
import com.example.springproject.service.Venueservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/venue")
@CrossOrigin(origins = "http://localhost:3000")
public class Venuecontroller {
    @Autowired
    private Venueservice venueservice;

    @PostMapping("/post")
    public String add(@RequestBody Venue venue){
        venueservice.saveVenue(venue);
        return "Venue Saved";
    }

    @PutMapping("/update/{id}")
    public Venue updateVenue(@PathVariable Long id,@RequestBody Venue updatedVenue){
        return venueservice.updateVenue(id, updatedVenue);
    }

    @GetMapping("/get")
    public List<Venue> getAllVenues(){
        return venueservice.getAllVenues();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteVenue(@PathVariable Long id){
        venueservice.deleteVenue(id);
        return "Venue deleted";
    }
}
