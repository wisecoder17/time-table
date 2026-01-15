package com.example.springproject.repository;

import com.example.springproject.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Courserepository extends JpaRepository<Course, Integer> {

    List<Course> findByDepartmentId(int deptId);
    List<Course> findByCollegeId(int collegeId);
}
