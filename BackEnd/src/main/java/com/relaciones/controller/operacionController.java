package com.relaciones.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Deuda;
import com.relaciones.services.OperacionService;

@RestController
public class operacionController {
	
	@Autowired
	OperacionService operacionService;
	
	@PostMapping("/actualizarconsumo/{codigo}")
	public String updateConsumo(@PathVariable(value = "codigo") Long codigo,@RequestBody Date fechaActual) throws Exception{
		operacionService.actualizarConsumo(codigo);
		return "Ok";
	}
	
	@PostMapping("/actualizardeuda/{codigo}")
	public CuentaCredito updateDeuda(@PathVariable(value = "codigo") Long codigo,@RequestBody Date fechaActual) throws Exception{
		CuentaCredito cc = null;	
		try {
			cc = operacionService.valorFuturoActual(codigo, fechaActual);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return cc;
	}
	
	@PostMapping("/deudatotal/{codigo}")
	public Deuda deudaTotal(@PathVariable(value = "codigo") Long codigo,@RequestBody Date fechaActual) throws Exception{
		Deuda d = null;
		try {
			d = operacionService.calcularImporteTotal(codigo, fechaActual);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		
		return d;
	}
}	
