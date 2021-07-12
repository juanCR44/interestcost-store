import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import { Cliente } from 'src/app/model/cliente';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { Deuda } from 'src/app/model/deuda';
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { RegistroService } from 'src/app/servicio/registro.service';

$(document).ready(function(){
  $(document).on("click",".popup-trigger2", function(){
    $(".overlay2").addClass('active');
    $(".popup-search2").addClass('active');
    $("button").click(function(){
      $(".popup-search2").removeClass('active');
      $(".overlay2").removeClass('active');
    });
    $("button").click(function(){
      $(".popup-search2").removeClass('active');
      $(".overlay2").removeClass('active');
    });
  });
});


@Component({
  selector: 'app-renovar-cliente',
  templateUrl: './renovar-cliente.component.html',
  styleUrls: ['./renovar-cliente.component.css']
})
export class RenovarClienteComponent implements OnInit {
  codigoCliente:number;
  cliente: Cliente;
  cc:CuentaCredito;
  cuentaCredito: CuentaCredito = new CuentaCredito();
  deuda: Deuda = new Deuda();
  actualDate = new Date();
  date:string;
  datelimit:string;
  limitDate = new Date();
  pass = Math.floor(Math.random()*(10000-1000) + 1000);
  
  constructor(private registroServicio: RegistroService, private datePipe:DatePipe,private busquedaService:BusquedaService,private dataRoute: ActivatedRoute) {
    this.codigoCliente = parseInt(this.dataRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.busquedaService.buscarCliente(this.codigoCliente).subscribe(res => this.cliente = res)
    this.date = this.datePipe.transform(this.actualDate, 'yyyy-MM-dd');
    this.limitDate = this.add_months(this.limitDate, 1);
    this.datelimit = this.datePipe.transform(this.limitDate, 'yyyy-MM-dd');
    console.log(this.limitDate)
    console.log(this.actualDate)
    this.setDeuda();
  }

  setDeuda(){
		this.deuda.fechaPago = this.limitDate;
		this.deuda.interes = 0.0;
		this.deuda.mantenimiento = 5;
		this.deuda.monto = 0.0;
		this.deuda.mora = 0;
		this.deuda.total = 5.0;
  }

  add_months(dt, n) 
 {
   return new Date(dt.setMonth(dt.getMonth() + n));      
 }

  registroCliente(){
    console.log("jee")
    //numero random
    this.cuentaCredito.tipoTasa = this.cliente.cuentaCredito[0].tipoTasa;
    this.cuentaCredito.valorTasa = this.cliente.cuentaCredito[0].valorTasa;
    this.cuentaCredito.fechaApertura = this.actualDate;
    this.cuentaCredito.fechaLimite = this.limitDate;
    this.cuentaCredito.activo = true;
    this.cuentaCredito.saldoConsumido = 0.0;
    this.cuentaCredito.saldoTotal = this.cuentaCredito.saldoDisponible;
    this.registroServicio.registrarCuentaCredito(this.cuentaCredito, this.codigoCliente).subscribe(
      r => this.cc = r,
      err=> console.log("cuentacreditoerror"),
      ()=>this.registroServicio.registrarDeuda(this.deuda, this.cc.id).subscribe(rs=> console.log("finalizado"))
      )
  }

  /*
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }

    return '';
  }*/

}
