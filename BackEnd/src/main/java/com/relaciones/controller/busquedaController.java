package com.relaciones.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
public class busquedaController {
	@Autowired
	BodegueroService bodegueroService;
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
	
	@GetMapping("/buscarbodeguero/{codigo}")
	public Bodeguero buscarBodeguero(@PathVariable(value = "codigo") Long codigo) {
		Bodeguero b = null;
		try {
			b = bodegueroService.buscarBodeguero(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return b;
	}
	
	@GetMapping("/buscarcliente/{codigo}")
	public Cliente buscarCliente(@PathVariable(value = "codigo") Long codigo) {
		Cliente c = null;
		try {
			c = clienteService.buscarCliente(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return c;
	}
	
	@GetMapping("/buscarcuentacredito/{codigo}")
	public CuentaCredito buscarCuentaCredito(@PathVariable(value = "codigo") Long codigo) {
		CuentaCredito cc = null;
		try {
			cc = cuentaCreditoService.buscarCuentaCredito(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return cc;
	}
	
	@GetMapping("/cuentacreditoactivoxcliente/{codigo}")
	public CuentaCredito buscarCuentaCreditoActivoxCliente(@PathVariable(value = "codigo") Long codigo) {
		CuentaCredito cc = null;
		try {
			cc = cuentaCreditoService.cuentaActivaxCliente(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return cc;
	}

	
	@GetMapping("/buscarclientedni/{dni}")
	public List<Cliente> buscarDni(@PathVariable(value = "dni")String dni) throws Exception {
		return clienteService.buscarDni(dni);
	}
	
	@GetMapping("/cuentacreditoxdni/{dni}")
	public List<CuentaCredito> buscarCuentaCreditoActivoxDni(@PathVariable(value = "dni") String dni) throws Exception {
		
		return cuentaCreditoService.listadoCuentaActivaxClienteDni(dni);
	}
	
	@GetMapping("/cuentacreditoinactivoxdni/{dni}")
	public List<CuentaCredito> buscarCuentaCreditoInactivoxDni(@PathVariable(value = "dni") String dni) throws Exception {
		
		return cuentaCreditoService.listadoCuentaInactivaxClienteDni(dni);
	}
	
	@GetMapping("/buscardeuda/{codigo}")
	public Deuda buscarDeuda(@PathVariable(value = "codigo") Long codigo) {
		Deuda d = null;
		try {
			d = deudaService.buscarDeuda(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return d;
	}
	
	@GetMapping("/buscarpago/{codigo}")
	public Pago buscarPago(@PathVariable(value = "codigo") Long codigo) {
		Pago p= null;
		try {
			p = pagoService.buscarPago(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return p;
	}
	
	@GetMapping("/buscarventa/{codigo}")
	public Venta buscarVenta(@PathVariable(value = "codigo") Long codigo) {
		Venta v = null;
		try {
			v = ventaService.buscarVenta(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return v;
	}
}
