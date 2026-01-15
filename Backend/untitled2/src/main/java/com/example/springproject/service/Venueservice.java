package com.example.springproject.service;

import com.example.springproject.model.Venue;
import com.example.springproject.repository.Venuerepo;

import java.util.List;

public interface Venueservice {
    public Venue saveVenue(Venue venue);

    List<Venue>getAllVenues();

    Venue updateVenue(Long id, Venue updatedVenue);

    void deleteVenue(Long id);
}
