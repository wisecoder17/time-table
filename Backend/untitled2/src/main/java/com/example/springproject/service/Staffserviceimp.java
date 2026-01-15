package com.example.springproject.service;

import com.example.springproject.model.Staff;
import com.example.springproject.repository.Staffrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Staffserviceimp implements Staffservice{
    @Autowired
    private Staffrepository staffrepository;

    @Override
    public Staff saveStaff(Staff staff){
        return staffrepository.save(staff);
    }

    @Override
    public List<Staff> getAllStaff(){
        return staffrepository.findAll();
    }

    public List<Staff> getStaffByDepartment(int deptid){
        return staffrepository.findByDeptid(deptid);
    }

    @Override
    public Staff updateStaff(int id, Staff updatedStaff){
        Optional<Staff> optional= staffrepository.findById(id);
        if(optional.isPresent()){
            Staff existing = optional.get();
            existing.setSurname(updatedStaff.getSurname());
            existing.setFirstname(updatedStaff.getFirstname());
            existing.setMiddlename(updatedStaff.getMiddlename());
            existing.setTitle(updatedStaff.getTitle());
            existing.setDeptid(updatedStaff.getDeptid());
            existing.setStatusID(updatedStaff.getStatusID());
            existing.setType(updatedStaff.getType());
            existing.setIn_use(updatedStaff.getIn_use());
            existing.setDuty_count(updatedStaff.getDuty_count());
            existing.setSpecialization(updatedStaff.getSpecialization());
            existing.setResearch_area(updatedStaff.getResearch_area());
            existing.setDiscipline(updatedStaff.getDiscipline());
            return staffrepository.save(existing);
        }
        throw new RuntimeException("Staff not found");
    }

    @Override
    public void deleteStaff(int id){
        staffrepository.deleteById(id);
    }


}
