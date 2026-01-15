package com.example.springproject.repository;

import com.example.springproject.model.Outputtab;
import org.hibernate.result.Output;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Outputrepo extends JpaRepository<Outputtab,Long> {
}
