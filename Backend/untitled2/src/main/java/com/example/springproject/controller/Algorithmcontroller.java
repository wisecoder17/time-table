package com.example.springproject.controller;

import com.example.springproject.model.Algorithmtable;
import com.example.springproject.service.Algorithmservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/algorithm")
@CrossOrigin("http://localhost:3000")

public class Algorithmcontroller {
    @Autowired
    private Algorithmservice algorithmservice;

    @PostMapping("/alg")
    public String add(@RequestBody List<Algorithmtable> algorithmtableList) {
        for (Algorithmtable algorithmtable : algorithmtableList){
            algorithmservice.saveAlgorithmtable(algorithmtable);
        }

        return "Working";
    }
}
