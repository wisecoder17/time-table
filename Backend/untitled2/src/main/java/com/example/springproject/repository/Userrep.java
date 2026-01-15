package com.example.springproject.repository;

import com.example.springproject.model.Users;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Userrep extends JpaRepository<Users,Long> {
    Optional<Users> findByusername(String username);
}
