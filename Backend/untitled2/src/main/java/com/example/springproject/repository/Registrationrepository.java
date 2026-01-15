package com.example.springproject.repository;

import com.example.springproject.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Registrationrepository extends JpaRepository<Registration, Integer> {

}
