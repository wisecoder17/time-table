package com.example.springproject.controller;

import com.example.springproject.model.Program;
import com.example.springproject.model.Studentsemreg;
import com.example.springproject.service.Studentsemregservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sem")
@CrossOrigin(origins = "http://localhost:3000")
public class Studentsemregcontroller {
    @Autowired
    private Studentsemregservice studentsemregservice;

    @PostMapping("/reg")
    public String add(@RequestBody Studentsemreg studentsemreg){
        studentsemregservice.saveStudentsemreg(studentsemreg);
        return "Student semester registered";
    }

    @PutMapping("/update/{id}")
    public Studentsemreg updateStudentsem(@PathVariable int id, @RequestBody Studentsemreg updatedStudentsem){
        return studentsemregservice.updateStudentsem(id,updatedStudentsem);
    }

    @GetMapping("/get")
    public List<Studentsemreg> getAllStudentsem(){
        return studentsemregservice.getAllStudentsem();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStudentsem(@PathVariable int id){
        studentsemregservice.deleteStudentsem(id);
        return "Student semester registration deleted";
    }
}
