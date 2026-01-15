package com.example.springproject.service;

import com.example.springproject.model.Examtt1;
import org.springframework.stereotype.Service;

import java.util.List;

public interface Examtt1service {
   Examtt1 saveExamtt1(Examtt1 examtt1);

   List<Examtt1> getAllExamtt1();

   Examtt1 updateExamtt1(int id, Examtt1 updatedExamtt1);

   void deleteExamtt1(int id);
}
