package com.example.springproject.service;

import com.example.springproject.model.Constrainttable;
import com.example.springproject.repository.Cosntrainttablerepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Constraintserviceimp implements Constraintservice{
    @Autowired
    private Cosntrainttablerepo cosntrainttablerepo;

    @Override
    public Constrainttable saveConstrainttable(Constrainttable constrainttable){
        return cosntrainttablerepo.save(constrainttable);
    }
}
