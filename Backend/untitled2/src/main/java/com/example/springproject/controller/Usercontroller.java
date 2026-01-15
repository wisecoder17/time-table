package com.example.springproject.controller;

import com.example.springproject.model.Users;
import com.example.springproject.service.Userservice;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class Usercontroller {
    private final Userservice userservice;

    public Usercontroller(Userservice userservice){
        this.userservice = userservice;
    }

    @PostMapping("/register")
    public Users register(@RequestBody Users users){
        return userservice.saveUsers(users);
    }

    @GetMapping("/all")
    public List<Users> getAllUsers(){
        return  userservice.getAllUsers();
    }

    @GetMapping("/{username}")
    public Users getUser(@PathVariable String username){
        return userservice.getUsersbyusername(username);
    }

    @PostMapping("/login")
    public Users login(@RequestBody Users loginRequest) {
        Users user = userservice.getUsersbyusername(loginRequest.getUsername());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return user; // You may exclude password before returning
        }
        throw new RuntimeException("Invalid username or password");
    }

}
