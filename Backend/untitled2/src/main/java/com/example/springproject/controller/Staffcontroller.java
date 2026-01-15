package com.example.springproject.controller;

import com.example.springproject.model.Staff;
import com.example.springproject.model.Users;
import com.example.springproject.repository.Userrep;
import com.example.springproject.service.Staffservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class Staffcontroller {
    @Autowired
    private Staffservice staffservice;

    @Autowired
    private Userrep userrep;

    @PostMapping("/post")
    public String add(@RequestBody Staff staff){
        staffservice.saveStaff(staff);
        return "Staff done";
    }

    @PutMapping("/update/{id}")
    public Staff updateStaff(@PathVariable int id, @RequestBody Staff updatedStaff){
        return staffservice.updateStaff(id,updatedStaff);
    }

    @GetMapping("/get")
    public List<Staff> getAllStaff(@RequestParam String username){
        Users user = userrep.findByusername(username)
                .orElseThrow(()-> new RuntimeException("Users not found"));
        List<Staff> staff;
        if("ADMIN".equalsIgnoreCase(user.getRole().name())){
            return staffservice.getAllStaff();
        }else{
            if(user.getDepartment() == null){
                throw new RuntimeException("Department not for this user");
            }

        }
        int deptid =user.getDepartment().getId();
        return staffservice.getStaffByDepartment(deptid);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStaff(@PathVariable int id){
        staffservice.deleteStaff(id);
        return "Staff deleted";
    }

}
