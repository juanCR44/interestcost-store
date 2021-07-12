package com.relaciones.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Deuda;
import com.relaciones.repository.CuentaCreditoRepository;
import com.relaciones.repository.DeudaRepository;

@Service
public class DeudaService {
	
	@Autowired
	DeudaRepository deudaRepository;
	@Autowired
	CuentaCreditoRepository cuentaCreditoRepository;
	
	public void updateDeuda(Deuda deuda, CuentaCredito cuentaCredito) throws Exception{
		Deuda d = deudaRepository.findById(deuda.getId()).orElseThrow(() -> new Exception("No se encontro entidad"));
		d.setCuentaCredito(cuentaCredito);
		d.setFechaPago(deuda.getFechaPago());
		d.setId(deuda.getId());
		d.setInteres(deuda.getInteres());
		d.setMantenimiento(deuda.getMantenimiento());
		d.setMonto(deuda.getMonto());
		d.setMora(deuda.getMora());
		d.setPago(deuda.getPago());
		d.setTotal(deuda.getTotal());
		System.out.println("deuda");
		deudaRepository.save(d);
	}
	
	public Deuda registroDeuda(Long codigo, Deuda deuda) throws Exception{
		CuentaCredito cc = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		cc.setDeuda(deuda);
		deuda.setCuentaCredito(cc);
		return deudaRepository.save(deuda);
	}
	
	public Deuda buscarDeuda(Long codigo) throws Exception{
		Deuda d = deudaRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return d;
	}
	
	public List<Deuda> listadoDeuda(){
		return (List<Deuda>) deudaRepository.findAll();
	}
}
