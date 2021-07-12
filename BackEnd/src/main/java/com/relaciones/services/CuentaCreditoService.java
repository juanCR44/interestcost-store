package com.relaciones.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relaciones.model.Bodeguero;
import com.relaciones.model.Cliente;
import com.relaciones.model.CuentaCredito;
import com.relaciones.model.Deuda;
import com.relaciones.repository.BodegueroRepository;
import com.relaciones.repository.ClienteRepository;
import com.relaciones.repository.CuentaCreditoRepository;
import com.relaciones.repository.DeudaRepository;

@Service
public class CuentaCreditoService {
	
	@Autowired
	CuentaCreditoRepository cuentaCreditoRepository;
	@Autowired
	ClienteRepository clienteRepository;
	@Autowired
	DeudaRepository deudaRepository;
	@Autowired 
	BodegueroRepository bodegueroRepository;
	
	public CuentaCredito registroCuentaCredito(Long codigo, CuentaCredito cuentaCredito) throws Exception{
		System.out.println("llego aqui");
		Cliente c = clienteRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		c.getCuentaCredito().add(cuentaCredito);
		cuentaCredito.setCliente(c);
		cuentaCredito.setActivo(true);
		System.out.println(cuentaCredito.getFechaLimite());
		cuentaCreditoRepository.save(cuentaCredito);
		return cuentaCredito;
	}
	
	public void updateCuentaCredito(CuentaCredito cuentaCredito, Deuda deuda) throws Exception{
		CuentaCredito cc = cuentaCreditoRepository.findById(cuentaCredito.getId()).orElseThrow(() -> new Exception("No se encontro entidad"));
		cc.setActivo(cuentaCredito.getActivo());
		cc.setCliente(cuentaCredito.getCliente());
		cc.setDeuda(deuda);
		cc.setFechaApertura(cuentaCredito.getFechaApertura());
		cc.setFechaLimite(cuentaCredito.getFechaLimite());
		cc.setId(cuentaCredito.getId());
		cc.setMoneda(cuentaCredito.getMoneda());
		cc.setSaldoConsumido(cuentaCredito.getSaldoConsumido());
		cc.setSaldoDisponible(cuentaCredito.getSaldoDisponible());
		cc.setTipoTasa(cuentaCredito.getTipoTasa());
		cc.setValorTasa(cuentaCredito.getValorTasa());
		cc.setVenta(cuentaCredito.getVenta());
		cuentaCreditoRepository.save(cc);
	}
	
	public CuentaCredito buscarCuentaCredito(Long codigo) throws Exception{
		CuentaCredito cc = cuentaCreditoRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return cc;
	}
	
	
	public List<CuentaCredito> listadoCuentaActivaxBodeguero(Long codigo) throws Exception{
		Bodeguero b = bodegueroRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		List<Cliente> clientes = b.getCliente();
		if(clientes.size() >0) {
			List<CuentaCredito> cuentaCreditos = new ArrayList<>();
			
			for(Cliente cliente: clientes) {
				for(int y = 0; y < cliente.getCuentaCredito().size(); y++) {
					if(cliente.getCuentaCredito().get(y).getActivo() == true)
						cuentaCreditos.add(cliente.getCuentaCredito().get(y));
				}
			}
			
			return cuentaCreditos;
		}
		return null;
	}
	
	public List<CuentaCredito> listadoCuentaInactivaxBodeguero(Long codigo) throws Exception{
		Bodeguero b = bodegueroRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		List<Cliente> clientes = b.getCliente();
		if(clientes.size()>0) {
			List<CuentaCredito> cuentaCreditos = new ArrayList<>();
			
			for(Cliente cliente: clientes) {
				for(int y = 0; y < cliente.getCuentaCredito().size(); y++) {
					if(cliente.getCuentaCredito().get(y).getActivo() == false)
						cuentaCreditos.add(cliente.getCuentaCredito().get(y));
				}
			}
			
			return cuentaCreditos;
		}
		return null;
	}
	
	public List<CuentaCredito> listadoCuentaInactivaxCliente(Long codigo) throws Exception{
		Cliente c = clienteRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		List<CuentaCredito> cuentaCreditos = new ArrayList<>();
		
		for(int y = 0; y < c.getCuentaCredito().size(); y++) {
			if(c.getCuentaCredito().get(y).getActivo() == false)
				cuentaCreditos.add(c.getCuentaCredito().get(y));
		}
		
		return cuentaCreditos;
	}
	
	public CuentaCredito cuentaActivaxCliente(Long codigo) throws Exception{
		Cliente c = clienteRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		CuentaCredito cuentaCredito = null;
		
		for(int y = 0; y < c.getCuentaCredito().size(); y++) {
			if(c.getCuentaCredito().get(y).getActivo() == true) {
				cuentaCredito = c.getCuentaCredito().get(y);
				break;
			}
		}
		
		return cuentaCredito;	
	}
	
	public List<CuentaCredito> listadoCuentaxCliente(Long codigo) throws Exception{
		Cliente c = clienteRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));

		List<CuentaCredito> cuentaCreditos = new ArrayList<>();
			
		for(int y = 0; y < c.getCuentaCredito().size(); y++) {
			cuentaCreditos.add(c.getCuentaCredito().get(y));
		}
			
		return cuentaCreditos;	
	}
	
	public List<CuentaCredito> listadoCuentaActivaxClienteDni(String dni) throws Exception{
		List<Cliente> c = clienteRepository.findByDni(dni);
		if(c.size()>0) {
			List<CuentaCredito> cuentaCreditos = new ArrayList<>();
			
			for(int y = 0; y < c.get(0).getCuentaCredito().size(); y++) {
				if(c.get(0).getCuentaCredito().get(y).getActivo() == true)
					cuentaCreditos.add(c.get(0).getCuentaCredito().get(y));
			}
			
			return cuentaCreditos;	
		}
		return null;
	}
	
	public List<CuentaCredito> listadoCuentaInactivaxClienteDni(String dni) throws Exception{
		System.out.println(dni);
		List<Cliente> c = clienteRepository.findByDni(dni);
		if(c.size()>0) {
			List<CuentaCredito> cuentaCreditos = new ArrayList<>();
			
			for(int y = 0; y < c.get(0).getCuentaCredito().size(); y++) {
				if(c.get(0).getCuentaCredito().get(y).getActivo() == false)
					cuentaCreditos.add(c.get(0).getCuentaCredito().get(y));
			}
			
			return cuentaCreditos;
		}
		return null;
	}
}
