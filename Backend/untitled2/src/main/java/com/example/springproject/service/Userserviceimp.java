package com.example.springproject.service;

import com.example.springproject.model.Department;
import com.example.springproject.model.Users;
import com.example.springproject.repository.Userrep;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Userserviceimp implements  Userservice{
    private final Userrep userrep;

    public Userserviceimp(Userrep userrep){
        this.userrep=userrep;
    }

    @Override
    public Users saveUsers(Users users){
        return userrep.save(users);
    }

    @Override
    public Users getUsersbyusername(String username){
        return userrep.findByusername(username).orElseThrow();
    }

    @Override
    public List<Users>getAllUsers(){
        return userrep.findAll();
    }

    @Override
    public Department getUsersDepartment(String username){
        Users users = userrep.findByusername(username).orElseThrow();
        return users.getDepartment();
    }
    
}
