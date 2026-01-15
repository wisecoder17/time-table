package com.example.springproject.controller;

import com.example.springproject.model.Examtab;
import com.example.springproject.service.Examtabservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/examtab")
@CrossOrigin(origins = "http://localhost:3000")
public class Examtabcontroller {
    @Autowired
    private Examtabservice examtabservice;

    @PostMapping("/post")
    public String add(@RequestBody Examtab examtab){
        examtabservice.saveExamtab(examtab);
        return "Working";
    }


}
