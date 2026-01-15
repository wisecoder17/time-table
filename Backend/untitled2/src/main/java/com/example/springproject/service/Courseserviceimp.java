package com.example.springproject.service;

import com.example.springproject.model.Course;
import com.example.springproject.model.Student;
import com.example.springproject.repository.Courserepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Courseserviceimp implements Courseservice{
    @Autowired
    private Courserepository courserepository;

    @Override
    public Course saveCourse(Course course){
        return courserepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courserepository.findAll();
    }

    public List<Course> getCoursesByDepartment(int deptId) {
        return courserepository.findByDepartmentId(deptId);
    }

    public List<Course> getCoursesByCollege(int collegeId){
        return courserepository.findByCollegeId(collegeId);
    }

    @Override
    public Course updateCourse(int id, Course updatedCourse){
        Optional<Course> optional = courserepository.findById(id);
        if(optional.isPresent()){
            Course existing = optional.get();
            existing.setCode(updatedCourse.getCode());
            existing.setUnit(updatedCourse.getUnit());
            existing.setTitle(updatedCourse.getTitle());
            existing.setSemester(updatedCourse.getSemester());
            existing.setExamtype(updatedCourse.getExamtype());
            existing.setEn_Count(updatedCourse.getEn_Count());
            existing.setDepartmentId(updatedCourse.getDepartmentId());
            return courserepository.save(existing);
        }
        throw new RuntimeException("Course not found");
    }

    @Override
    public void deleteCourse(int id){
        courserepository.deleteById(id);
    }
}