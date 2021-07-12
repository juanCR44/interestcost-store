package com.relaciones.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.relaciones.model.Bodeguero;
import com.relaciones.model.Cliente;
import com.relaciones.repository.BodegueroRepository;
import com.relaciones.repository.ClienteRepository;

@Service
public class ClienteService {
	
	@Autowired
	ClienteRepository clienteRepository;
	
	@Autowired
	BodegueroRepository bodegueroRepository;
	
	public Cliente registroCliente(Long codigo, Cliente cliente) throws Exception {
		Bodeguero b = bodegueroRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		b.getCliente().add(cliente);
		cliente.setBodeguero(b);
		clienteRepository.save(cliente);
		return cliente;
	}
	
	public Cliente buscarCliente(Long codigo) throws Exception{
		Cliente c = clienteRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return c;
	}
	
	public List<Cliente> buscarDni(String dni) throws Exception{
		System.out.println(dni);
		List<Cliente> c = clienteRepository.findByDni(dni);
		System.out.println(c.get(0).getId());
		return c;
	}
	
	
	public List<Cliente> listadoCliente(Long codigo) throws Exception{
		Bodeguero b = bodegueroRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return b.getCliente();
	}
}
