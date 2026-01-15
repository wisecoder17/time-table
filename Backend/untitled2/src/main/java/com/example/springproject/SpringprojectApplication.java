package com.example.springproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;


@SpringBootApplication
public class SpringprojectApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringprojectApplication.class, args);
    };

};


