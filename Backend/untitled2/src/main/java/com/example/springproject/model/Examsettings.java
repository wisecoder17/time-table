package com.example.springproject.model;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "main interface")
public class Examsettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String session;
    private String semester;
    private LocalDate start_date;
    private LocalDate end_date;
    private int days_per_week;
    private int periods_per_day;

    public Examsettings(Long id, String session, String semester, LocalDate start_date, LocalDate end_date, int days_per_week, int periods_per_day) {
        this.id = id;
        this.session = session;
        this.semester = semester;
        this.start_date = start_date;
        this.end_date = end_date;
        this.days_per_week = days_per_week;
        this.periods_per_day = periods_per_day;
    }
}
