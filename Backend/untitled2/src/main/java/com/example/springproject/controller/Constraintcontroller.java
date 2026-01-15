package com.example.springproject.controller;

import com.example.springproject.model.Constrainttable;
import com.example.springproject.service.Constraintservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("constraint")
@CrossOrigin("http://localhost:3000")
public class Constraintcontroller {
    @Autowired
    private Constraintservice constraintservice;

    @PostMapping("/add")
    public String add(@RequestBody Constrainttable constrainttable){
        constraintservice.saveConstrainttable(constrainttable);
        return "Constraints saved";
    }

    @GetMapping("/test")
    public String test(){
        return "Constraint works";
    }
}
