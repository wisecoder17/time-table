package com.example.springproject.service;

import com.example.springproject.model.Outputtab;
import com.example.springproject.repository.Outputrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Outputserviceimp implements Outputservice{
    @Autowired
    private Outputrepo outputrepo;

    @Override
    public Outputtab saveOutputtab(Outputtab outputtab){
        return outputrepo.save(outputtab);
    }
}