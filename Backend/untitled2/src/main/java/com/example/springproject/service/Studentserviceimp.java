package com.example.springproject.service;

import com.example.springproject.model.Student;
import com.example.springproject.repository.Studentrepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class Studentserviceimp implements Studentservice {

    @Autowired
    private Studentrepository studentrepository;

    @Override
    public Student saveStudent(Student student){
        return studentrepository.save(student);
    }

    @Override
    public List<Student> getAllStudents(){
        return studentrepository.findAll();
    }

    @Override
    public List<Student> getStudentsByDepartment(int deptID) {
        return studentrepository.findByDeptID(deptID);
    }

    @Override
    public Student updateStudent(Long id, Student updatedStudent){
        Optional<Student> optional = studentrepository.findById(id);
        if(optional.isPresent()){
            Student existing = optional.get();
            existing.setMatric_No(updatedStudent.getMatric_No());
            existing.setSurname(updatedStudent.getSurname());
            existing.setFirstname(updatedStudent.getFirstname());
            existing.setLevel(updatedStudent.getLevel());
            existing.setMiddlename(updatedStudent.getMiddlename());
            existing.setDeptID(updatedStudent.getDeptID());
            existing.setGender(updatedStudent.getGender());
            existing.setStart_Session(updatedStudent.getStart_Session());
            existing.setProgramme(updatedStudent.getProgramme());
            existing.setProgrammeID(updatedStudent.getProgrammeID());
            return studentrepository.save(existing);
        }
        throw new RuntimeException("Student not found");
    }

    @Override
    public void deleteStudent(Long id){
        studentrepository.deleteById(id);
    }
}
