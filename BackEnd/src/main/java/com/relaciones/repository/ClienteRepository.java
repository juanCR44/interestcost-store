package com.relaciones.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.relaciones.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{
	public List<Cliente> findByDni(String dni);
	
}
