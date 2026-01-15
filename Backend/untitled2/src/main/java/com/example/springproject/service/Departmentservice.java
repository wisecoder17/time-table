package com.example.springproject.service;

import com.example.springproject.model.Course;
import com.example.springproject.model.Department;

import java.util.List;

public interface Departmentservice {
    Department saveDepartment(Department department);

    List<Department> getAllDepartments();

    Department updateDepartment(int id, Department updateDepartment);

    void deleteDepartment(int id);
}
