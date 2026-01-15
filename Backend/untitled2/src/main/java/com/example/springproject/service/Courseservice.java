package com.example.springproject.service;

import com.example.springproject.model.Course;

import java.util.List;

public interface Courseservice {
    Course saveCourse(Course course);

    List<Course>getAllCourses();

    List<Course> getCoursesByDepartment(int deptId);

    Course updateCourse(int id, Course updatedCourse);

    void deleteCourse(int id);
}
