package com.example.springproject.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "centre")
public class Examtt1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private Integer type;
    private String name;
    private Integer encount;
    @JsonIgnore
    @OneToMany(mappedBy = "examtt1",cascade = CascadeType.ALL)
    private List<Department> departments;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getEncount() {
        return encount;
    }

    public void setEncount(Integer encount) {
        this.encount = encount;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }
}
