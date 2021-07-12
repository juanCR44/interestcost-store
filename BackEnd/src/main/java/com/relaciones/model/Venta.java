package com.relaciones.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "TP_VENTA")
public class Venta implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name = "DESCRIPCION")
	private String descripcion;
	@Column(name = "DELIVERY", precision = 2)
	private Boolean delivery;
	@Column(name = "TOTAL", precision = 2)
	private Double total;
	@Column(name = "IMPORTE", precision = 2)
	private Double importe;
	@Column(name = "FECHA_CONSUMO")
	private Date fechaConsumo;

	@ManyToOne
	@JoinColumn(name = "ID_CUENTA_CREDITO")
	@JsonIgnoreProperties("venta")
	private CuentaCredito cuentaCredito;

	public Venta(Long id, String descripcion, Boolean delivery, Double total, Double importe, Date fechaConsumo,
			CuentaCredito cuentaCredito) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.delivery = delivery;
		this.total = total;
		this.importe = importe;
		this.fechaConsumo = fechaConsumo;
		this.cuentaCredito = cuentaCredito;
	}

	public Venta() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Boolean getDelivery() {
		return delivery;
	}

	public void setDelivery(Boolean delivery) {
		this.delivery = delivery;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Double getImporte() {
		return importe;
	}

	public void setImporte(Double importe) {
		this.importe = importe;
	}

	public Date getFechaConsumo() {
		return fechaConsumo;
	}

	public void setFechaConsumo(Date fechaConsumo) {
		this.fechaConsumo = fechaConsumo;
	}

	public CuentaCredito getCuentaCredito() {
		return cuentaCredito;
	}

	public void setCuentaCredito(CuentaCredito cuentaCredito) {
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
		Venta other = (Venta) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
