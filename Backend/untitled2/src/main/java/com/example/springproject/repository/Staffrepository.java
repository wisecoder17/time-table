package com.example.springproject.repository;

import com.example.springproject.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Staffrepository extends JpaRepository<Staff,Integer> {
    List<Staff> findByDeptid(int deptid);
}
