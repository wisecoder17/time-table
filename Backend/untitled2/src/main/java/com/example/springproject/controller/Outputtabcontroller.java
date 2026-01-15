package com.example.springproject.controller;

import com.example.springproject.model.Outputtab;
import com.example.springproject.service.Outputservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/outputtab")
@CrossOrigin(origins = "http://localhost:3000")
public class Outputtabcontroller {
    @Autowired
    private Outputservice outputservice;


    @PostMapping("/post")
    public String add(@RequestBody Outputtab outputtab){
        outputservice.saveOutputtab(outputtab);
        return "Working";
    }

    @GetMapping("/test")
    public String test(){
        return "Jxt testing as usual";
    }

}
