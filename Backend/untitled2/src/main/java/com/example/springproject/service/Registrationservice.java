package com.example.springproject.service;

import com.example.springproject.model.Department;
import com.example.springproject.model.Registration;

import java.util.List;

public interface Registrationservice {
    Registration saveRegistration(Registration registration);

    List<Registration> getAllRegistration();

    Registration updateRegistration(int id, Registration updateRegistration);

    void deleteRegistration(int id);
}
