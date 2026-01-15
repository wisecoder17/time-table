package com.example.springproject.service;

import com.example.springproject.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;


public interface Studentservice {
     Student saveStudent(Student student);

     List<Student> getAllStudents();

     List<Student> getStudentsByDepartment(int deptID);

     Student updateStudent(Long id, Student updatedStudent);

     void deleteStudent(Long id);


}
