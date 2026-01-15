package com.example.springproject.service;

import com.example.springproject.model.Examsettings;
import com.example.springproject.repository.Examsettingsrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Examsettingsserviceimp implements Examsettingsservice {
    @Autowired
    private Examsettingsrepository examsettingsrepository;

    @Override
    public Examsettings saveExamsettings(Examsettings examsettings){
        return examsettingsrepository.save(examsettings);
    }
}
