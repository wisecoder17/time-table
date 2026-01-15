package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int Id;
    private String matric_No;
    private String surname;
    private String firstname;
    private String middlename;
    private String gender;
    private int deptID;
    private int programmeID;
    private String start_Session;
    private int level;
    private String programme;
//    @ManyToOne
//    @JoinColumn(name = "deptID", nullable = false)
//    private Department department;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getMatric_No() {
        return matric_No;
    }

    public void setMatric_No(String matric_No) {
        this.matric_No = matric_No;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getDeptID() {
        return deptID;
    }

    public void setDeptID(int deptID) {
        this.deptID = deptID;
    }

    public int getProgrammeID() {
        return programmeID;
    }

    public void setProgrammeID(int programmeID) {
        this.programmeID = programmeID;
    }

    public String getStart_Session() {
        return start_Session;
    }

    public void setStart_Session(String start_Session) {
        this.start_Session = start_Session;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getProgramme() {
        return programme;
    }

    public void setProgramme(String programme) {
        this.programme = programme;
    }

//    public Department getDepartment() {
//        return department;
//    }
//
//    public void setDepartment(Department department) {
//        this.department = department;
//    }
}


