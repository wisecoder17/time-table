package com.example.springproject.service;

import com.example.springproject.model.Examtt1;
import com.example.springproject.repository.Examtt1repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class Examtt1serviceimp implements Examtt1service{
    @Autowired
    private Examtt1repository examtt1repository;

    @Override
    public Examtt1 saveExamtt1(Examtt1 examtt1){
        return examtt1repository.save(examtt1);
    }

    @Override
    public List<Examtt1> getAllExamtt1(){
        return examtt1repository.findAll();
    }

    @Override
    public Examtt1 updateExamtt1(int id, Examtt1 updatedExamtt1){
        Optional<Examtt1> optional= examtt1repository.findById(id);
        if(optional.isPresent()){
            Examtt1 existing = optional.get();
            existing.setCode(updatedExamtt1.getCode());
            existing.setType(updatedExamtt1.getType());
            existing.setName(updatedExamtt1.getName());
            existing.setEncount(updatedExamtt1.getEncount());
            return examtt1repository.save(existing);
        }
        throw new RuntimeException("Center not found");
    }

    @Override
    public void deleteExamtt1(int id){
        examtt1repository.deleteById(id);
    }
}
