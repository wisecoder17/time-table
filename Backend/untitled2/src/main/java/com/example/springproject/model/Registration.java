package com.example.springproject.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "registration")
public class Registration {
    @Id
    private int id;
    private int regDMC;
    private int centreID;
    private String matricNO;
    private String courseCode;
    private String session;
    private int semester;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRegDMC() {
        return regDMC;
    }

    public void setRegDMC(int regDMC) {
        this.regDMC = regDMC;
    }

    public int getCentreID() {
        return centreID;
    }

    public void setCentreID(int centreID) {
        this.centreID = centreID;
    }

    public String getMatricNO() {
        return matricNO;
    }

    public void setMatricNO(String matricNO) {
        this.matricNO = matricNO;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }
}
