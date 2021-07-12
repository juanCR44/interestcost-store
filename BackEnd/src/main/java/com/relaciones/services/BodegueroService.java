package com.relaciones.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relaciones.model.Bodeguero;
import com.relaciones.repository.BodegueroRepository;

@Service
public class BodegueroService {
	
	@Autowired
	BodegueroRepository bodegueroRepository;
	
	public Bodeguero registroBodeguero(Bodeguero bodeguero) throws Exception{
		return bodegueroRepository.save(bodeguero);
	}
	
	public Bodeguero buscarBodeguero(Long codigo) throws Exception{
		Bodeguero b = bodegueroRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return b;
	}
	
}
