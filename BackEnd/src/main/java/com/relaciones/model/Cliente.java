package com.relaciones.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import ch.qos.logback.core.subst.Token.Type;

@Entity
@Table(name = "TP_CLIENTE")
public class Cliente implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name = "NOMBRE")
	private String nombre;
	@Column(name = "APELLIDO")
	private String apellido;
	@Column(name = "DNI", unique = true)
	private String dni;
	@Column(name = "PASSWORD", unique = true)
	private String password;

	@OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY)
	@JsonIgnoreProperties("cliente")
	private List<CuentaCredito> cuentaCredito;

	@ManyToOne
	@JoinColumn(name = "ID_BODEGUERO")
	@JsonIgnoreProperties("cliente")
	private Bodeguero bodeguero;

	public Cliente(Long id, String nombre, String apellido, String dni, String password,
			List<CuentaCredito> cuentaCredito, Bodeguero bodeguero) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
		this.password = password;
		this.cuentaCredito = cuentaCredito;
		this.bodeguero = bodeguero;
	}

	public Cliente() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public Bodeguero getBodeguero() {
		return bodeguero;
	}

	public void setBodeguero(Bodeguero bodeguero) {
		this.bodeguero = bodeguero;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<CuentaCredito> getCuentaCredito() {
		return cuentaCredito;
	}

	public void setCuentaCredito(List<CuentaCredito> cuentaCredito) {
		this.cuentaCredito = cuentaCredito;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cliente other = (Cliente) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
