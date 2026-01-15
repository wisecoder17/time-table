package com.example.springproject.repository;

import com.example.springproject.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Programrepository extends JpaRepository<Program,Integer> {
}
