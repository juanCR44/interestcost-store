package com.relaciones.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "TP_DEUDA")
public class Deuda implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name = "FECHA_PAGO")
	private Date fechaPago;
	@Column(name = "MONTO",precision = 2)
	private Double monto;
	@Column(name = "MANTENIMIENTO", precision = 2)
	private Integer mantenimiento;
	@Column(name = "INTERES", precision = 7)
	private Double interes;
	@Column(name = "MORA", precision = 2)
	private Integer mora;
	@Column(name = "TOTAL", precision = 2)
	private Double total;

	@OneToOne(mappedBy = "deuda")
	@JsonIgnoreProperties("deuda")
	private CuentaCredito cuentaCredito;
	@OneToOne(mappedBy = "deuda")
	@JsonIgnoreProperties("deuda")
	private Pago pago;

	public Deuda(Long id, Date fechaPago, Double monto, Integer mantenimiento, Double interes, Integer mora,
			Double total, CuentaCredito cuentaCredito, Pago pago) {
		super();
		this.id = id;
		this.fechaPago = fechaPago;
		this.monto = monto;
		this.mantenimiento = mantenimiento;
		this.interes = interes;
		this.mora = mora;
		this.total = total;
		this.cuentaCredito = cuentaCredito;
		this.pago = pago;
	}

	public Deuda() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFechaPago() {
		return fechaPago;
	}

	public void setFechaPago(Date fechaPago) {
		this.fechaPago = fechaPago;
	}

	public Double getMonto() {
		return monto;
	}

	public void setMonto(Double monto) {
		this.monto = monto;
	}

	public Integer getMantenimiento() {
		return mantenimiento;
	}

	public void setMantenimiento(Integer mantenimiento) {
		this.mantenimiento = mantenimiento;
	}

	public Integer getMora() {
		return mora;
	}

	public void setMora(Integer mora) {
		this.mora = mora;
	}

	public Double getInteres() {
		return interes;
	}

	public void setInteres(Double interes) {
		this.interes = interes;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public CuentaCredito getCuentaCredito() {
		return cuentaCredito;
	}

	public void setCuentaCredito(CuentaCredito cuentaCredito) {
		this.cuentaCredito = cuentaCredito;
	}

	public Pago getPago() {
		return pago;
	}

	public void setPago(Pago pago) {
		this.pago = pago;
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
		Deuda other = (Deuda) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
