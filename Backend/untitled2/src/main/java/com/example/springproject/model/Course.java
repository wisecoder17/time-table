package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "course")
public class Course {
    @Id

    private int id;
    private String code;
    private int en_Count;
    private int unit;
    private String title;
    private int semester;
    private int examtype;
    private int departmentId;
    private int collegeId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getEn_Count() {
        return en_Count;
    }

    public void setEn_Count(int en_Count) {
        this.en_Count = en_Count;
    }

    public int getUnit() {
        return unit;
    }

    public void setUnit(int unit) {
        this.unit = unit;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public int getExamtype() {
        return examtype;
    }

    public void setExamtype(int examtype) {
        this.examtype = examtype;
    }

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public int getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(int collegeId) {
        this.collegeId = collegeId;
    }
}
