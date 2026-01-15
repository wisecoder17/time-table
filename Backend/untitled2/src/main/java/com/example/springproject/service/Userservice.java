package com.example.springproject.service;

import com.example.springproject.model.Department;
import com.example.springproject.model.Users;

import java.util.List;

public interface Userservice {
    Users saveUsers(Users users);
    Users getUsersbyusername(String username);
    List<Users> getAllUsers();
    Department getUsersDepartment(String username);


}
