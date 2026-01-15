package com.example.springproject.service;

import com.example.springproject.model.Program;
import com.example.springproject.model.Registration;
import com.example.springproject.repository.Programrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Programserviceimp implements Programservice{
    @Autowired
    private Programrepository programrepository;

    @Override
    public Program saveProgram(Program program){
        return programrepository.save(program);
    }

    @Override
    public List<Program> getAllPrograms(){
        return programrepository.findAll();
    }

    @Override
    public Program updateProgram(int id, Program updatedProgram){
        Optional<Program> optional= programrepository.findById(id);
        if(optional.isPresent()){
            Program existing = optional.get();
            existing.setName(updatedProgram.getName());
            existing.setCode(updatedProgram.getCode());
            existing.setDeptID(updatedProgram.getDeptID());
            existing.setNewCodeID(updatedProgram.getNewCodeID());
            return programrepository.save(existing);
        }
        throw new RuntimeException("Program not found");
    }

    @Override
    public void deleteProgram(int id){
        programrepository.deleteById(id);
    }
}
