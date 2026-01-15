package com.example.springproject.service;

import com.example.springproject.model.Slashedcourse;
import com.example.springproject.model.Studentsemreg;
import com.example.springproject.repository.Slashedcourserepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Slashedcourseserviceimp implements Slashedcourseservice{
    @Autowired
    private Slashedcourserepository slashedcourserepository;

    @Override
    public Slashedcourse saveSlashedcourse(Slashedcourse slashedcourse){
        return slashedcourserepository.save(slashedcourse);
    }

    @Override
    public List<Slashedcourse> getAllSlashed(){
        return slashedcourserepository.findAll();
    }

    @Override
    public Slashedcourse updateSlashed(int id, Slashedcourse updatedSlashed){
        Optional<Slashedcourse> optional= slashedcourserepository.findById(id);
        if(optional.isPresent()){
            Slashedcourse existing = optional.get();
            existing.setCode(updatedSlashed.getCode());
            existing.setType(updatedSlashed.getType());
            existing.setSem(updatedSlashed.getSem());
            return slashedcourserepository.save(existing);
        }
        throw new RuntimeException("Slashed courses not found");
    }

    @Override
    public void deleteSlashed(int id){
        slashedcourserepository.deleteById(id);
    }

}
