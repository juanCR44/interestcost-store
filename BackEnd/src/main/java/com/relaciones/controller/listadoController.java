package com.relaciones.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.relaciones.model.Cliente;
import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Deuda;
import com.relaciones.model.Pago;
import com.relaciones.model.Venta;
import com.relaciones.services.ClienteService;
import com.relaciones.services.CuentaCreditoService;
import com.relaciones.services.DeudaService;
import com.relaciones.services.PagoService;
import com.relaciones.services.VentaService;

@RestController
public class listadoController {
	@Autowired
	ClienteService clienteService;
	@Autowired
	CuentaCreditoService cuentaCreditoService;
	@Autowired
	DeudaService deudaService;
	@Autowired
	PagoService pagoService;
	@Autowired
	VentaService ventaService;
	
	@GetMapping("listadocliente/{codigo}")
	public List<Cliente> listadoCliente(@PathVariable(value = "codigo")Long codigo) throws Exception{
		return clienteService.listadoCliente(codigo);
	}
	
	@GetMapping("cuentasactivasbodeguero/{codigo}")
	public List<CuentaCredito> listadoCuentaActivaxBodeguero(@PathVariable(value = "codigo")Long codigo) throws Exception{
		return cuentaCreditoService.listadoCuentaActivaxBodeguero(codigo);
	}
	
	@GetMapping("cuentasinactivasbodeguero/{codigo}")
	public List<CuentaCredito> listadoCuentaInactivaxBodeguero(@PathVariable(value = "codigo")Long codigo)throws Exception{
		return cuentaCreditoService.listadoCuentaInactivaxBodeguero(codigo);
	}
	
	@GetMapping("cuentascliente/{codigo}")
	public List<CuentaCredito> listadoCuentaxCliente(@PathVariable(value = "codigo")Long codigo)throws Exception{
		return cuentaCreditoService.listadoCuentaxCliente(codigo);
	}

	/*
	@GetMapping("cuentasactivascliente/{codigo}")
	public List<CuentaCredito> listadoCuentaActivaxCliente(@PathVariable(value = "codigo")Long codigo)throws Exception{
		return cuentaCreditoService.listadoCuentaActivaxCliente(codigo);
	}*/
	
	@GetMapping("cuentasinactivascliente/{codigo}")
	public List<CuentaCredito> listadoCuentaInactivaxCliente(@PathVariable(value = "codigo")Long codigo)throws Exception{
		return cuentaCreditoService.listadoCuentaInactivaxCliente(codigo);
	}
	
	@GetMapping("listadodeuda")
	public List<Deuda> listadoDeuda(){
		return deudaService.listadoDeuda();
	}
	
	@GetMapping("listadoservice")
	public List<Pago> listadoPago(){
		return pagoService.listadoPago();
	}
	
	@GetMapping("listadoventa/{codigo}")
	public List<Venta> listadoVenta(@PathVariable(value = "codigo")Long codigo) throws Exception{
		return ventaService.listadoVenta(codigo);
	}
}
