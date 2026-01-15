package com.example.springproject.repository;

import com.example.springproject.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Departmentrepository extends JpaRepository<Department, Integer> {
}
