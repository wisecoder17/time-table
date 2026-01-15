package com.example.springproject.controller;

import com.example.springproject.model.Department;
import com.example.springproject.model.Examtt1;
import com.example.springproject.service.Departmentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
@CrossOrigin(origins = "http://localhost:3000")
public class Departmentcontroller {
    @Autowired
    private Departmentservice departmentservice;

    @PostMapping("/post")
    public String add(@RequestBody Department department){
        departmentservice.saveDepartment(department);
        return "Department done";
    }

    @PutMapping("/update/{id}")
    public Department updateDepartment(@PathVariable int id, @RequestBody Department updatedDepartment){
        return departmentservice.updateDepartment(id,updatedDepartment);
    }

    @GetMapping("/get")
    public List<Department> getAllDepartments(){
        return departmentservice.getAllDepartments();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDepartment(@PathVariable int id){
        departmentservice.deleteDepartment(id);
        return "Department deleted";
    }
}
