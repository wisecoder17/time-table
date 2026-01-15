package com.example.springproject.service;


import com.example.springproject.model.Program;
import com.example.springproject.model.Registration;
import org.springframework.stereotype.Service;

import java.util.List;


public interface Programservice {
    Program saveProgram(Program program);
    List<Program> getAllPrograms();

    Program updateProgram(int id, Program updateProgram);

    void deleteProgram(int id);
}
