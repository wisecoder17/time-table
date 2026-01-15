package com.example.springproject.service;

import com.example.springproject.model.Optimizetab;
import com.example.springproject.repository.Optimizetabrep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Optimizetabserveimp implements Optimizetabservice{

    @Autowired
    private Optimizetabrep optimizetabrep;

    @Override
    public Optimizetab saveOptimizetab(Optimizetab optimizetab){
        return optimizetabrep.save(optimizetab);
    }
}
