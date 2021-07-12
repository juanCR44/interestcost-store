package com.relaciones.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.relaciones.model.Bodeguero;
import com.relaciones.model.Cliente;
import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Deuda;
import com.relaciones.model.Pago;
import com.relaciones.model.Venta;
import com.relaciones.services.BodegueroService;
import com.relaciones.services.ClienteService;
import com.relaciones.services.CuentaCreditoService;
import com.relaciones.services.DeudaService;
import com.relaciones.services.PagoService;
import com.relaciones.services.VentaService;

@RestController
public class RegisterController {
	
	@Autowired
	BodegueroService bodegueroService;
	@Autowired
	ClienteService clienteService;
	@Autowired
	CuentaCreditoService cuentaCreditoService;
	@Autowired
	VentaService ventaService;
	@Autowired
	PagoService pagoService;
	@Autowired
	DeudaService deudaService;
	
	@PostMapping("/registrarbodeguero")
	public Bodeguero registroBodeguero(@RequestBody Bodeguero bodeguero) {
		Bodeguero b = null;
		try {
			b = bodegueroService.registroBodeguero(bodeguero);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return  b;
	}
	
	@PostMapping("/registrarcliente/{codigo}")
	public Cliente registroCliente(@PathVariable(value = "codigo") Long codigo, @RequestBody Cliente cliente) {
		Cliente c= null;
		try {
			c = clienteService.registroCliente(codigo, cliente);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return  c;
	}
	
	@PostMapping("/registrardeuda/{codigo}")
	public Deuda registroDeuda(@PathVariable(value = "codigo") Long codigo, @RequestBody Deuda deuda) {
		Deuda d = null;
		try {
			d = deudaService.registroDeuda(codigo, deuda);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return  d;
	}
	
	@PostMapping("/registrarcuentacredito/{codigo}")
	public CuentaCredito registroCuentaCredito(@PathVariable(value = "codigo") Long codigo, @RequestBody CuentaCredito cuentaCredito) {
		CuentaCredito cc= null;
		try {
			cc = cuentaCreditoService.registroCuentaCredito(codigo, cuentaCredito);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return  cc;
	}
	
	@PostMapping("/registrarventa/{codigo}")
	public Venta registroVenta(@PathVariable(value = "codigo") Long codigo, @RequestBody Venta venta) {
		Venta v= null;
		try {
			v = ventaService.registroVenta(codigo, venta);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return  v;
	}
	
	@PostMapping("/registrarpago/{codigo}")
	public Pago registroPago(@PathVariable(value = "codigo") Long codigo, @RequestBody Pago pago) {
		Pago p = null;
		try {
			p = pagoService.registroPago(codigo, pago);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return  p;
	}
}
