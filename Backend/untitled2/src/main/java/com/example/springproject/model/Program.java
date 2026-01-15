package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "program")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    private String name;
    private String code;
    private int deptID;
    private int newCodeID;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getDeptID() {
        return deptID;
    }

    public void setDeptID(int deptID) {
        this.deptID = deptID;
    }

    public int getNewCodeID() {
        return newCodeID;
    }

    public void setNewCodeID(int newCodeID) {
        this.newCodeID = newCodeID;
    }
}
