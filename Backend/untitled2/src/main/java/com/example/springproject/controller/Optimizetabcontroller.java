package com.example.springproject.controller;

import com.example.springproject.model.Optimizetab;
import com.example.springproject.service.Optimizetabservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/opt")
@CrossOrigin(origins = "http://localhost:3000")
public class Optimizetabcontroller {
    @Autowired
    private Optimizetabservice optimizetabservice;

    @PostMapping("/post")
    public String add(@RequestBody Optimizetab optimizetab){
        optimizetabservice.saveOptimizetab(optimizetab);
        return "Working";
    }
}
