package com.example.springproject.service;

import com.example.springproject.model.Slashedcourse;
import com.example.springproject.model.Studentsemreg;

import java.util.List;

public interface Slashedcourseservice {
    Slashedcourse saveSlashedcourse(Slashedcourse slashedcourse);
    List<Slashedcourse> getAllSlashed();

    Slashedcourse updateSlashed(int id, Slashedcourse updateSlashed);

    void deleteSlashed(int id);
}
