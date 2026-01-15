package com.example.springproject.service;

import com.example.springproject.model.Examtab;
import com.example.springproject.repository.Examtabrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Examtabserviceimp implements Examtabservice{
    @Autowired
    private Examtabrepo examtabrepo;

    @Override
    public Examtab saveExamtab(Examtab examtab){
        return examtabrepo.save(examtab);
    }
}
