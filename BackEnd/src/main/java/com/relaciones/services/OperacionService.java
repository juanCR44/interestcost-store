package com.relaciones.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Deuda;
import com.relaciones.model.Venta;
import com.relaciones.repository.CuentaCreditoRepository;

@Service
public class OperacionService {
	@Autowired
	CuentaCreditoRepository cuentaCreditoRepository;
	@Autowired
	CuentaCreditoService cuentaCreditoService;
	@Autowired
	DeudaService deudaService;

	private List<Long> getDays(List<Venta> venta, Date fechaPivot) {
		List<Long> listaDias = new ArrayList<>();
		Collections.reverse(venta);
		
		Date pivot = fechaPivot;
		for (Venta v : venta) {
			long diff = pivot.getTime() - v.getFechaConsumo().getTime();
			pivot = v.getFechaConsumo();
			System.out.println(TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS) + " CONVIRTIENDO");
			listaDias.add(TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
		}
		Collections.reverse(listaDias);
		return listaDias;
	}
	
	public void actualizarConsumo(Long codigo) throws Exception{
		CuentaCredito cuentaCredito = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		Venta venta = cuentaCredito.getVenta().get(cuentaCredito.getVenta().size() - 1);
		Deuda deuda = cuentaCredito.getDeuda();
		
		deuda.setMonto(deuda.getMonto() + venta.getImporte());
		deuda.setTotal(deuda.getTotal() + venta.getImporte());
		cuentaCredito.setSaldoConsumido(cuentaCredito.getSaldoConsumido() + venta.getImporte());
		cuentaCredito.setSaldoDisponible(cuentaCredito.getSaldoTotal() - cuentaCredito.getSaldoConsumido());
		cuentaCreditoService.updateCuentaCredito(cuentaCredito, deuda);
		deudaService.updateDeuda(deuda, cuentaCredito);
	}

	public CuentaCredito valorFuturoActual(Long codigo, Date diaActual) throws Exception {
		CuentaCredito cuentaCredito = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		Deuda deuda = cuentaCredito.getDeuda();
		List<Venta> ventas = cuentaCredito.getVenta();
		//List<Double> res = new ArrayList<>();
		System.out.println(ventas.size() + " tamanio de ventas!");
		System.out.println();
		if(ventas.size()>0) {
			List<Long> listaDias = getDays(ventas, diaActual);
			Collections.reverse(ventas);
			Double capital = 0.0d;
			Double stock = 0.0d;
			Double interes = 0.0d;
			if(cuentaCredito.getTipoTasa().equals("Simple")) {
				for(int x = 0; x < listaDias.size(); x++) {
					capital += ventas.get(x).getImporte();
					interes += capital*cuentaCredito.getValorTasa()*listaDias.get(x)/3000.0d;
					System.out.println("Capital: " + capital + " Tasa: " + cuentaCredito.getValorTasa() + " Dias: " + listaDias.get(x));
					System.out.println("interes generado " + interes);
				}
				stock = capital + interes;
			}
			
			if(cuentaCredito.getTipoTasa().equals("Nominal")) {
				for(int x = 0; x < listaDias.size(); x++) {
					capital += ventas.get(x).getImporte();
					if(listaDias.get(x) == 0)
						continue;
					stock = capital*(Math.pow((1 + cuentaCredito.getValorTasa()/3000.0d),listaDias.get(x)));
					interes += stock - capital;
				}
			}
			
			if(cuentaCredito.getTipoTasa().equals("Efectivo")) {
				for(int x = 0; x < listaDias.size(); x++) {
					capital += ventas.get(x).getImporte();
					if(listaDias.get(x) == 0)
						continue;
					stock = capital*(Math.pow((1 + cuentaCredito.getValorTasa()/100.0d),(listaDias.get(x))/30.0d));
					interes += stock - capital;
				}
			}
			System.out.println("Interes: " + interes + " Capital: " + capital);
			deuda.setMonto(capital);
			deuda.setInteres(interes);
			deuda.setTotal(capital + interes);
			deudaService.updateDeuda(deuda, cuentaCredito);
		}
		return cuentaCredito;
	}
	
	
	public int calcularMora(Long codigo, Date diaActual) throws Exception{
		CuentaCredito cuentaCredito = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		int mora = 0;
		long diff = diaActual.getTime() - cuentaCredito.getFechaLimite().getTime();
		Long dias = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
		for(int x = 0; x < dias; x++) {
			if(x==0)
			{
				mora+=5;
			}
			else {
				mora+=1;
			}
		}
		return mora;
		/*Deuda deuda = cuentaCredito.getDeuda();
		deuda.setMora(mora);
		deudaService.updateDeuda(deuda.getId(), deuda);*/
	}
	
	public Deuda calcularImporteTotal(Long codigo, Date diaActual) throws Exception{
		int mora = calcularMora(codigo, diaActual);
		CuentaCredito cuentaCredito = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		Deuda deuda = cuentaCredito.getDeuda();
		Double total = deuda.getMonto() + deuda.getMantenimiento() + deuda.getInteres() + mora;
		deuda.setMora(mora);
		deuda.setTotal(total);
		cuentaCreditoService.updateCuentaCredito(cuentaCredito,deuda);
		deudaService.updateDeuda(deuda,cuentaCredito);
		return deuda;
	}
}
