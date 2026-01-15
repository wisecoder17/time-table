package com.example.springproject.controller;

import com.example.springproject.model.Department;
import com.example.springproject.model.Program;
import com.example.springproject.service.Programservice;
import com.example.springproject.service.Programservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/program")
@CrossOrigin(origins = "http://localhost:3000")
public class Programcontroller {
    @Autowired
    private Programservice programservice;

    @PostMapping("/post")
    public String add(@RequestBody Program program){
        programservice.saveProgram(program);
        return "Sharp";
    }

    @PutMapping("/update/{id}")
    public Program updateProgram(@PathVariable int id, @RequestBody Program updatedProgram){
        return programservice.updateProgram(id,updatedProgram);
    }

    @GetMapping("/get")
    public List<Program> getAllPrograms(){
        return programservice.getAllPrograms();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProgram(@PathVariable int id){
        programservice.deleteProgram(id);
        return "Program deleted";
    }
}
