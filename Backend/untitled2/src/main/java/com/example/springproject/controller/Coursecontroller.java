package com.example.springproject.controller;

import com.example.springproject.model.Course;
import com.example.springproject.model.Users;
import com.example.springproject.repository.Userrep;
import com.example.springproject.service.Courseservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/course")
public class Coursecontroller {

    @Autowired
    private Courseservice courseservice;

    @Autowired
    private Userrep userrep;

    ///// Add Course
    @PostMapping("/done")
    public String add(@RequestBody Course course) {
        courseservice.saveCourse(course);
        return "Saved course";
    }



    /////Get courses only for the logged-in user’s department
    @GetMapping("/get")
    public List<Course> getAllCourses(@RequestParam String username) {
        Users user = userrep.findByusername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Course> courses;
        if("ADMIN".equalsIgnoreCase(user.getRole().name())){
            return courseservice.getAllCourses();
        }else {
            if (user.getDepartment() == null) {
                throw new RuntimeException("Department not set for this user");
            }
        }

        int deptId = user.getDepartment().getId();  // assuming your Users entity has department_id
        return courseservice.getCoursesByDepartment(deptId);
    }

    // Update course
    @PutMapping("/update/{id}")
    public Course updateCourse(@PathVariable int id, @RequestBody Course updatedCourse) {
        return courseservice.updateCourse(id, updatedCourse);
    }

    // Export courses (for CSV)
    @GetMapping("/export")
    public String exportCourse(@RequestParam String username) throws IOException {
        Users user = userrep.findByusername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int deptId = user.getDepartment().getId();;
        List<Course> courses = courseservice.getCoursesByDepartment(deptId);

        String filepath = "C:/Institution/courses.csv";

        FileWriter writer = new FileWriter(filepath);
        writer.append("Coursecode,Courseunit,title,semester,examptype,encount,offereingdeptid\n");
        for (Course c : courses) {
            writer.append(c.getCode()).append(",")
                    .append(String.valueOf(c.getUnit())).append(",")
                    .append(c.getTitle()).append(",")
                    .append(String.valueOf(c.getSemester())).append(",")
                    .append(String.valueOf(c.getExamtype())).append(",")
                    .append(String.valueOf(c.getEn_Count())).append(",")
                    .append(String.valueOf(c.getDepartmentId())).append("\n");
        }
        writer.flush();
        writer.close();
        return "CSV generated at: " + filepath;
    }

    // Delete course
    @DeleteMapping("/delete/{id}")
    public String deleteCourse(@PathVariable int id) {
        courseservice.deleteCourse(id);
        return "Course deleted";
    }
}
