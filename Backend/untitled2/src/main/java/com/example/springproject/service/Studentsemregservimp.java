package com.example.springproject.service;

import com.example.springproject.model.Registration;
import com.example.springproject.model.Studentsemreg;
import com.example.springproject.repository.Studentsemregrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Studentsemregservimp implements Studentsemregservice{
    @Autowired
    private Studentsemregrepo studentsemregrepo;

    @Override
    public Studentsemreg saveStudentsemreg(Studentsemreg studentsemreg){
        return studentsemregrepo.save(studentsemreg);
    }


    @Override
    public List<Studentsemreg> getAllStudentsem(){
        return studentsemregrepo.findAll();
    }

    @Override
    public Studentsemreg updateStudentsem(int id, Studentsemreg updatedStudentsem){
        Optional<Studentsemreg> optional= studentsemregrepo.findById(id);
        if(optional.isPresent()){
            Studentsemreg existing = optional.get();
            existing.setMatric_NO(updatedStudentsem.getMatric_NO());
            existing.setCourse_Code_List(updatedStudentsem.getCourse_Code_List());
            existing.setSession(updatedStudentsem.getSession());
            existing.setSemester(updatedStudentsem.getSemester());
            return studentsemregrepo.save(existing);
        }
        throw new RuntimeException("Student semester registration not found");
    }

    @Override
    public void deleteStudentsem(int id){
        studentsemregrepo.deleteById(id);
    }


}
