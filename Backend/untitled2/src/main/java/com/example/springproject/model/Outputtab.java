package com.example.springproject.model;

import jakarta.persistence.*;

@Entity
@Table(name = "output tab")
public class Outputtab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private boolean mix_exams;
    private boolean more_space;
    private boolean le_fullyinV;
    private boolean usehalf_Vspace;
    private boolean skip_week;
    private boolean sitting_arrangement;
    private int students_per_staff;
    private int staff_specialV;
    private boolean select_staff_randomly;
    private boolean update_staff_Dcount;
    private boolean saveTT_csv;
    private boolean saveTT_pdf;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isMix_exams() {
        return mix_exams;
    }

    public void setMix_exams(boolean mix_exams) {
        this.mix_exams = mix_exams;
    }

    public boolean isMore_space() {
        return more_space;
    }

    public void setMore_space(boolean more_space) {
        this.more_space = more_space;
    }

    public boolean isLe_fullyinV() {
        return le_fullyinV;
    }

    public void setLe_fullyinV(boolean le_fullyinV) {
        this.le_fullyinV = le_fullyinV;
    }

    public boolean isUsehalf_Vspace() {
        return usehalf_Vspace;
    }

    public void setUsehalf_Vspace(boolean usehalf_Vspace) {
        this.usehalf_Vspace = usehalf_Vspace;
    }

    public boolean isSkip_week() {
        return skip_week;
    }

    public void setSkip_week(boolean skip_week) {
        this.skip_week = skip_week;
    }

    public boolean isSitting_arrangement() {
        return sitting_arrangement;
    }

    public void setSitting_arrangement(boolean sitting_arrangement) {
        this.sitting_arrangement = sitting_arrangement;
    }

    public int getStudents_per_staff() {
        return students_per_staff;
    }

    public void setStudents_per_staff(int students_per_staff) {
        this.students_per_staff = students_per_staff;
    }

    public int getStaff_specialV() {
        return staff_specialV;
    }

    public void setStaff_specialV(int staff_specialV) {
        this.staff_specialV = staff_specialV;
    }

    public boolean isSelect_staff_randomly() {
        return select_staff_randomly;
    }

    public void setSelect_staff_randomly(boolean select_staff_randomly) {
        this.select_staff_randomly = select_staff_randomly;
    }

    public boolean isUpdate_staff_Dcount() {
        return update_staff_Dcount;
    }

    public void setUpdate_staff_Dcount(boolean update_staff_Dcount) {
        this.update_staff_Dcount = update_staff_Dcount;
    }

    public boolean isSaveTT_csv() {
        return saveTT_csv;
    }

    public void setSaveTT_csv(boolean saveTT_csv) {
        this.saveTT_csv = saveTT_csv;
    }

    public boolean isSaveTT_pdf() {
        return saveTT_pdf;
    }

    public void setSaveTT_pdf(boolean saveTT_pdf) {
        this.saveTT_pdf = saveTT_pdf;
    }
}
