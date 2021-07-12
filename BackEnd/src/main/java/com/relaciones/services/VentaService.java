package com.relaciones.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Venta;
import com.relaciones.repository.CuentaCreditoRepository;
import com.relaciones.repository.VentaRepository;

@Service
public class VentaService {
	
	@Autowired
	VentaRepository ventaRepository;
	@Autowired
	CuentaCreditoRepository cuentaCreditoRepository;
	
	public Venta registroVenta(Long codigo, Venta venta) throws Exception{
		CuentaCredito cc = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		cc.getVenta().add(venta);
		venta.setCuentaCredito(cc);
		//venta.setFechaConsumo(new Date());

		return ventaRepository.save(venta);
	}
	
	public Venta buscarVenta(Long codigo) throws Exception{
		Venta v = ventaRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return v;
	}
	
	public List<Venta> listadoVenta(Long codigo) throws Exception{
		CuentaCredito cc = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return cc.getVenta();
	}
}
