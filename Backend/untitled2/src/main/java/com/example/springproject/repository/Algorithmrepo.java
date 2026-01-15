package com.example.springproject.repository;

import com.example.springproject.model.Algorithmtable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Algorithmrepo extends JpaRepository<Algorithmtable,Long> {
}
