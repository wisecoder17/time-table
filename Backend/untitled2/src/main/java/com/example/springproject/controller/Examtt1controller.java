package com.example.springproject.controller;

import com.example.springproject.model.Examtt1;
import com.example.springproject.service.Examtt1service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/centre")

public class Examtt1controller {
    @Autowired
    private Examtt1service examtt1service;

    @PostMapping("/post")
    public String add(@RequestBody Examtt1 examtt1){
        examtt1service.saveExamtt1(examtt1);
        return "Centre done";
    }

    @PutMapping("/update/{id}")
    public Examtt1 updateExamtt1(@PathVariable int id, @RequestBody Examtt1 updatedExamtt1){
        return examtt1service.updateExamtt1(id,updatedExamtt1);
    }

    @GetMapping("/get")
    public List<Examtt1> getAllExamtt1(){
        return examtt1service.getAllExamtt1();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteExamtt1(@PathVariable int id){
        examtt1service.deleteExamtt1(id);
        return "Center deleted";
    }
}
