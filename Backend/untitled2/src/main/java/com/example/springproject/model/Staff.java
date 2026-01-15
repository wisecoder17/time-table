package com.example.springproject.model;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import jakarta.persistence.*;
        import org.springframework.web.bind.annotation.CrossOrigin;

@Entity
@Table(name = "staff")

public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    private String surname;
    private String firstname;
    private String middlename;
    private int staff_id;
    private String title;
    private Integer deptid;
    private Integer statusID;
    private Integer type;
    private Integer in_use;
    private Integer duty_count;
    private String specialization;
    private String research_area;
    private String discipline;

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public Integer getIn_use() {
        return in_use;
    }

    public void setIn_use(Integer in_use) {
        this.in_use = in_use;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDeptid() {
        return deptid;
    }

    public void setDeptid(Integer deptid) {
        this.deptid = deptid;
    }

    public Integer getStatusID() {
        return statusID;
    }

    public void setStatusID(Integer statusID) {
        this.statusID = statusID;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }



    public Integer getDuty_count() {
        return duty_count;
    }

    public void setDuty_count(Integer duty_count) {
        this.duty_count = duty_count;
    }

    public String getResearch_area() {
        return research_area;
    }

    public void setResearch_area(String research_area) {
        this.research_area = research_area;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }


    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }
}

