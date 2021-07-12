package com.relaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.relaciones.model.Deuda;

public interface DeudaRepository extends JpaRepository<Deuda, Long>{

}
