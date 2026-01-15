package com.example.springproject.service;

import com.example.springproject.model.Staff;
import com.example.springproject.model.Venue;
import com.example.springproject.repository.Venuerepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Venueserviceimp implements Venueservice{
    @Autowired
    private Venuerepo venuerepo;

    @Override
    public Venue saveVenue(Venue venue){
        return venuerepo.save(venue);
    }

    @Override
    public List<Venue> getAllVenues(){
        return venuerepo.findAll();
    }

    @Override
    public Venue updateVenue(Long id, Venue updatedVenue){
        Optional<Venue> optional=venuerepo.findById(id);
        if(optional.isPresent()){
            Venue existing = optional.get();
            existing.setVenue_Code(updatedVenue.getVenue_Code());
            existing.setName(updatedVenue.getName());
            existing.setCapacity(updatedVenue.getCapacity());
            existing.setType(updatedVenue.getType());
            existing.setLocation(updatedVenue.getLocation());
            existing.setPreference(updatedVenue.getPreference());
            return venuerepo.save(existing);
        }
        throw new RuntimeException("Venue not found");
    }

    @Override
    public void deleteVenue(Long id){
        venuerepo.deleteById(id);
    };
}
