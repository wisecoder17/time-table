package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String code;

    @ManyToOne
    @JoinColumn(name = "college_id",nullable = false)
    private Examtt1 examtt1;

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



    public Examtt1 getExamtt1() {
        return examtt1;
    }

    public void setExamtt1(Examtt1 examtt1) {
        this.examtt1 = examtt1;
    }
}
