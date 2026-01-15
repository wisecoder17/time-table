package com.example.springproject.controller;


import com.example.springproject.model.Registration;
import com.example.springproject.service.Registrationservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin("http://localhost:3000")
public class Registrationcontroller {
    @Autowired
    private Registrationservice registrationservice;

    @PostMapping("/post")
    public String add(@RequestBody Registration registration){
        registrationservice.saveRegistration(registration);
        return "Registration done";
    }

    @PutMapping("/update/{id}")
    public Registration updateRegistration(@PathVariable int id, @RequestBody Registration updatedRegistration){
        return registrationservice.updateRegistration(id,updatedRegistration);
    }

    @GetMapping("/get")
    public List<Registration> getAllRegistration(){
        return registrationservice.getAllRegistration();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRegistration(@PathVariable int id){
        registrationservice.deleteRegistration(id);
        return "registraton deleted";
    }
}
