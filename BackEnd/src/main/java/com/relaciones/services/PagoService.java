package com.relaciones.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Deuda;
import com.relaciones.model.Pago;
import com.relaciones.repository.CuentaCreditoRepository;
import com.relaciones.repository.DeudaRepository;
import com.relaciones.repository.PagoRepository;

@Service
public class PagoService {
	@Autowired
	PagoRepository pagoRepository;
	@Autowired
	DeudaRepository deudaRepository;
	@Autowired
	CuentaCreditoService cuentaCreditoService;
	
	public Pago registroPago(Long codigo, Pago pago) throws Exception{
		Deuda deuda = deudaRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		CuentaCredito cc = deuda.getCuentaCredito();
		System.out.println("aqui");
		//pago.setFechaPago(new Date());
		pago.setDeuda(deuda);
		deuda.setPago(pago);
		cc.setActivo(false);
		//cuentaCreditoService.updateCuentaCredito(cc.getId(), cc);
		return pagoRepository.save(pago);
	}
	
	public Pago buscarPago(Long codigo) throws Exception{
		Pago p = pagoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return p;
	}
	
	public List<Pago> listadoPago(){
		return (List<Pago>) pagoRepository.findAll();
	}
}
