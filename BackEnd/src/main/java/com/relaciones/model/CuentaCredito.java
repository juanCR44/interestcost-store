package com.relaciones.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
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

@Entity
@Table(name = "TP_CUENTACREDITO")
public class CuentaCredito implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name = "ACTIVO")
	private Boolean Activo;
	@Column(name = "VALOR_TASA")
	private Double valorTasa;
	@Column(name = "TIPO_TASA")
	private String tipoTasa;
	@Column(name = "MONEDA")
	private String moneda;
	@Column(name = "SALDO_CONSUMIDO", precision = 2)
	private Double saldoConsumido;
	@Column(name = "SALDO_DISPONIBLE", precision = 2)
	private Double saldoDisponible;
	@Column(name = "SALDO_TOTAL", precision = 2)
	private Double saldoTotal;
	@Column(name = "FECHA_APERTURA")
	private Date fechaApertura;
	@Column(name = "FECHA_LIMITE")
	private Date fechaLimite;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ID_CLIENTE")
	@JsonIgnoreProperties("cuentaCredito")
	private Cliente cliente;

	@OneToMany(mappedBy = "cuentaCredito", fetch = FetchType.LAZY)
	@JsonIgnoreProperties("cuentaCredito")
	private List<Venta> venta;

	@OneToOne
	@JoinColumn(name = "ID_DEUDA")
	@JsonIgnoreProperties("cuentaCredito")
	private Deuda deuda;

	public CuentaCredito(Long id, Boolean activo, Double valorTasa, String tipoTasa, String moneda,
			Double saldoConsumido, Double saldoDisponible, Double saldoTotal, Date fechaApertura, Date fechaLimite,
			Cliente cliente, List<Venta> venta, Deuda deuda) {
		super();
		this.id = id;
		Activo = activo;
		this.valorTasa = valorTasa;
		this.tipoTasa = tipoTasa;
		this.moneda = moneda;
		this.saldoConsumido = saldoConsumido;
		this.saldoDisponible = saldoDisponible;
		this.saldoTotal = saldoTotal;
		this.fechaApertura = fechaApertura;
		this.fechaLimite = fechaLimite;
		this.cliente = cliente;
		this.venta = venta;
		this.deuda = deuda;
	}

	public CuentaCredito() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public Double getSaldoTotal() {
		return saldoTotal;
	}

	public void setSaldoTotal(Double saldoTotal) {
		this.saldoTotal = saldoTotal;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getValorTasa() {
		return valorTasa;
	}

	public void setValorTasa(Double valorTasa) {
		this.valorTasa = valorTasa;
	}

	public String getTipoTasa() {
		return tipoTasa;
	}

	public void setTipoTasa(String tipoTasa) {
		this.tipoTasa = tipoTasa;
	}

	public String getMoneda() {
		return moneda;
	}

	public void setMoneda(String moneda) {
		this.moneda = moneda;
	}

	public Double getSaldoConsumido() {
		return saldoConsumido;
	}

	public void setSaldoConsumido(Double saldoConsumido) {
		this.saldoConsumido = saldoConsumido;
	}

	public Double getSaldoDisponible() {
		return saldoDisponible;
	}

	public Boolean getActivo() {
		return Activo;
	}

	public void setActivo(Boolean activo) {
		Activo = activo;
	}

	public void setSaldoDisponible(Double saldoDisponible) {
		this.saldoDisponible = saldoDisponible;
	}

	public Date getFechaApertura() {
		return fechaApertura;
	}

	public void setFechaApertura(Date fechaApertura) {
		this.fechaApertura = fechaApertura;
	}

	public Date getFechaLimite() {
		return fechaLimite;
	}

	public void setFechaLimite(Date fechaLimite) {
		this.fechaLimite = fechaLimite;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public List<Venta> getVenta() {
		return venta;
	}

	public void setVenta(List<Venta> venta) {
		this.venta = venta;
	}

	public Deuda getDeuda() {
		return deuda;
	}

	public void setDeuda(Deuda deuda) {
		this.deuda = deuda;
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
		CuentaCredito other = (CuentaCredito) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
