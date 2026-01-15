package com.example.springproject.service;

import com.example.springproject.model.Department;
import com.example.springproject.model.Registration;
import com.example.springproject.repository.Registrationrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Registrationserviceimp implements Registrationservice{
    @Autowired
    private Registrationrepository registrationrepository;

    @Override
    public Registration saveRegistration(Registration registration){
        return registrationrepository.save(registration);
    }

    @Override
    public List<Registration> getAllRegistration(){
        return registrationrepository.findAll();
    }

    @Override
    public Registration updateRegistration(int id, Registration updatedRegistration){
        Optional<Registration> optional= registrationrepository.findById(id);
        if(optional.isPresent()){
            Registration existing = optional.get();
            existing.setRegDMC(updatedRegistration.getRegDMC());
            existing.setCentreID(updatedRegistration.getCentreID());
            existing.setMatricNO(updatedRegistration.getMatricNO());
            existing.setSession(updatedRegistration.getSession());
            existing.setSemester(updatedRegistration.getSemester());
            return registrationrepository.save(existing);
        }
        throw new RuntimeException("Department not found");
    }

    @Override
    public void deleteRegistration(int id){
        registrationrepository.deleteById(id);
    }
}
