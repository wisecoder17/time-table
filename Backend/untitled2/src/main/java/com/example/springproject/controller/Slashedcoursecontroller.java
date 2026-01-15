package com.example.springproject.controller;

import com.example.springproject.model.Slashedcourse;
import com.example.springproject.model.Studentsemreg;
import com.example.springproject.service.Slashedcourseservice;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/slashed")
@CrossOrigin(origins = "http://localhost:3000")
public class Slashedcoursecontroller {
    @Autowired
    private Slashedcourseservice slashedcourseservice;

    @PostMapping("/post")
    private String add(@RequestBody Slashedcourse slashedcourse){
        slashedcourseservice.saveSlashedcourse(slashedcourse);
        return "sharp";
    }

    @PutMapping("/update/{id}")
    public Slashedcourse updateSlashed(@PathVariable int id, @RequestBody Slashedcourse updatedSlashed){
        return slashedcourseservice.updateSlashed(id,updatedSlashed);
    }

    @GetMapping("/get")
    public List<Slashedcourse> getAllSlashed(){
        return slashedcourseservice.getAllSlashed();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSlashed(@PathVariable int id){
        slashedcourseservice.deleteSlashed(id);
        return "Slashed Courses deleted";
    }
}
