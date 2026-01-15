package com.example.springproject.model;

import jakarta.persistence.*;


@Entity
@Table(name = "optimization settings")

public class Optimizetab {
    @Id

    private int id;
    private boolean display_progress;
    private String opt_time;
    private int opt_cycle_count;
    private boolean int_mode;
    private boolean add_more_time;
    private  boolean exam_w_time;
    private  boolean exam_w_cycle;
    private boolean exam_w_both;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isDisplay_progress() {
        return display_progress;
    }

    public void setDisplay_progress(boolean display_progress) {
        this.display_progress = display_progress;
    }

    public String getOpt_time() {
        return opt_time;
    }

    public void setOpt_time(String opt_time) {
        this.opt_time = opt_time;
    }

    public int getOpt_cycle_count() {
        return opt_cycle_count;
    }

    public void setOpt_cycle_count(int opt_cycle_count) {
        this.opt_cycle_count = opt_cycle_count;
    }

    public boolean isInt_mode() {
        return int_mode;
    }

    public void setInt_mode(boolean int_mode) {
        this.int_mode = int_mode;
    }

    public boolean isAdd_more_time() {
        return add_more_time;
    }

    public void setAdd_more_time(boolean add_more_time) {
        this.add_more_time = add_more_time;
    }



    public boolean isExam_w_time() {
        return exam_w_time;
    }

    public void setExam_w_time(boolean exam_w_time) {
        this.exam_w_time = exam_w_time;
    }

    public boolean isExam_w_cycle() {
        return exam_w_cycle;
    }

    public void setExam_w_cycle(boolean exam_w_cycle) {
        this.exam_w_cycle = exam_w_cycle;
    }

    public boolean isExam_w_both() {
        return exam_w_both;
    }

    public void setExam_w_both(boolean exam_w_both) {
        this.exam_w_both = exam_w_both;
    }
}
