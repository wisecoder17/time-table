package com.example.springproject.service;

import com.example.springproject.model.Program;
import com.example.springproject.model.Studentsemreg;

import java.util.List;

public interface Studentsemregservice {
    Studentsemreg saveStudentsemreg(Studentsemreg studentsemreg);
    List<Studentsemreg> getAllStudentsem();

    Studentsemreg updateStudentsem(int id, Studentsemreg updateStudentsem);

    void deleteStudentsem(int id);
}
