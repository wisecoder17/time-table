package com.example.springproject.controller;

import com.example.springproject.model.Student;
import com.example.springproject.model.Users;
import com.example.springproject.repository.Userrep;
import com.example.springproject.service.Studentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
public class Studentcontroller {
    @Autowired
    private Studentservice studentservice;

    @Autowired
    private Userrep userrep;

    @GetMapping("/get")
    public List<Student> getAllStudents(@RequestParam String username) {
        Users user = userrep.findByusername(username)
                .orElseThrow(()->new RuntimeException("Users not found"));
        List<Student> students;
        if("ADMIN".equalsIgnoreCase(user.getRole().name())){
            return studentservice.getAllStudents();
        }else{
            if(user.getDepartment() == null){
                throw new RuntimeException("Department Not for User");
            }
        }
        int deptID = user.getDepartment().getId();
        return studentservice.getStudentsByDepartment(deptID);
    }

    @PutMapping("/update/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return studentservice.updateStudent(id, updatedStudent);
    }

    @PostMapping("/post")
    public String add(@RequestBody Student student){
        studentservice.saveStudent(student);
        return "New student is added";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id){
        studentservice.deleteStudent(id);
        return "Deleted successfully";
    }




}
