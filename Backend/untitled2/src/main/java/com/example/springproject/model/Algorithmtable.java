package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "algorithm tab")

public class Algorithmtable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private int id;
    private String algorithm_name;
    private String param_name;
    private String value;
    private Boolean checked;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAlgorithm_name() {
        return algorithm_name;
    }

    public void setAlgorithm_name(String algorithm_name) {
        this.algorithm_name = algorithm_name;
    }

    public String getParam_name() {
        return param_name;
    }

    public void setParam_name(String param_name) {
        this.param_name = param_name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }
}
