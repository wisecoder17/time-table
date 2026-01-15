package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "examtab")
public class Examtab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String schedule_policy;
    private int max_examl;
    private int min_examl;
    private int exam_level_high_limit;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSchedule_policy() {
        return schedule_policy;
    }

    public void setSchedule_policy(String schedule_policy) {
        this.schedule_policy = schedule_policy;
    }

    public int getMax_examl() {
        return max_examl;
    }

    public void setMax_examl(int max_examl) {
        this.max_examl = max_examl;
    }

    public int getMin_examl() {
        return min_examl;
    }

    public void setMin_examl(int min_examl) {
        this.min_examl = min_examl;
    }

    public int getExam_level_high_limit() {
        return exam_level_high_limit;
    }

    public void setExam_level_high_limit(int exam_level_high_limit) {
        this.exam_level_high_limit = exam_level_high_limit;
    }
}
