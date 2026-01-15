package com.example.springproject.service;

import com.example.springproject.model.Staff;

import java.util.List;

public interface Staffservice {
     Staff saveStaff(Staff staff);

     List<Staff> getAllStaff();

     List<Staff> getStaffByDepartment(int deptid);

     Staff updateStaff(int id, Staff updatedStaff);

     void deleteStaff(int id);
}
