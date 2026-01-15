package com.example.springproject.repository;

import com.example.springproject.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface Studentrepository extends JpaRepository<Student, Long>{
    List<Student> findByDeptID(int deptID);
}
