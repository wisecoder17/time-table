package com.example.springproject.repository;

import com.example.springproject.model.Studentsemreg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Studentsemregrepo extends JpaRepository<Studentsemreg, Integer> {
}
