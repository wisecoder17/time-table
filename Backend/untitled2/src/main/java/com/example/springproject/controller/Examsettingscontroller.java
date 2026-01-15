package com.example.springproject.controller;

import com.example.springproject.model.Examsettings;
import com.example.springproject.repository.Examsettingsrepository;
import com.example.springproject.service.Examsettingsservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/main")

public class Examsettingscontroller {
    @Autowired
    private Examsettingsservice examsettingsservice;

    @PostMapping("/add")
    public String add(@RequestBody Examsettings examsettings){
        examsettingsservice.saveExamsettings(examsettings);
        return "Done";


    }

    @GetMapping("/all")
    public String testRoute(){
        return "Finally working";
    }



}
