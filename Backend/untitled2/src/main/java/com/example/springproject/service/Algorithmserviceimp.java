package com.example.springproject.service;

import com.example.springproject.model.Algorithmtable;
import com.example.springproject.repository.Algorithmrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Algorithmserviceimp implements Algorithmservice{

    @Autowired
    private Algorithmrepo algorithmrepo;

    @Override
    public Algorithmtable saveAlgorithmtable(Algorithmtable algorithmtable){
        return algorithmrepo.save(algorithmtable);
    }
}
