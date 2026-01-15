package com.example.springproject.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "studentsemreg")
public class Studentsemreg {
    @Id
    private int id;
    private String matric_NO;
    private String course_Code_List;
    private String session;
    private int semester;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMatric_NO() {
        return matric_NO;
    }

    public void setMatric_NO(String matric_NO) {
        this.matric_NO = matric_NO;
    }

    public String getCourse_Code_List() {
        return course_Code_List;
    }

    public void setCourse_Code_List(String course_Code_List) {
        this.course_Code_List = course_Code_List;
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
