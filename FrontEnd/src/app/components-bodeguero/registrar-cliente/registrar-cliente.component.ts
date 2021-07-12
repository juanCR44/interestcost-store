import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { RegistroService } from 'src/app/servicio/registro.service';
import { DatePipe } from '@angular/common';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import * as $ from "jquery";
import { Deuda } from 'src/app/model/deuda';
import { ListadoService } from 'src/app/servicio/listado.service';

$(document).ready(function(){
  $(document).on("click",".popup-trigger2", function(){
    $(".overlay2").addClass('active');
    $(".popup-search2").addClass('active');
  });
  $(document).on("click",".btn-buscar", function(){
    $(".btn-buscar").click(function(){
      $(".popup-search2").removeClass('active');
      $(".overlay2").removeClass('active');
    });
  });
});


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrarClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  c:Cliente;
  cc:CuentaCredito;
  clientes: Cliente[] = []
  cuentaCredito: CuentaCredito = new CuentaCredito();
  deuda: Deuda = new Deuda();
  actualDate = new Date();
  date:string;
  datelimit:string;
  limitDate = new Date();
  pass = Math.floor(Math.random()*(10000-1000) + 1000);
  saldoDisponible:number;
  procede:boolean = true;
  
  constructor(private registroServicio: RegistroService, private datePipe:DatePipe,private listadoService:ListadoService) { }

  ngOnInit(): void {
    this.listaClientes();
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
    var countDecimals = function(value) {
      if (Math.floor(value) !== value)
          return value.toString().split(".")[1].length || 0;
      return 0;
    }
  
    this.cliente.password = this.pass.toString();
    this.cuentaCredito.fechaApertura = this.actualDate;
    this.cuentaCredito.fechaLimite = this.limitDate;
    this.cuentaCredito.activo = true;
    this.cuentaCredito.saldoConsumido = 0.0;
    this.cuentaCredito.saldoDisponible = this.saldoDisponible
    this.cuentaCredito.saldoTotal = this.cuentaCredito.saldoDisponible;
    try {
      if(countDecimals(this.saldoDisponible)> 2){
        alert("Saldo introducido erroneo")
        this.procede = false;
        window.location.reload();
      }
      else {
        this.registroServicio.registrarCliente(this.cliente).subscribe(
          res => this.c = res,
          err => console.log("clienteerror"),
          () => this.registroServicio.registrarCuentaCredito(this.cuentaCredito, this.c.id).subscribe(
            r => this.cc = r,
            err=> console.log("cuentacreditoerror"),
            ()=>this.registroServicio.registrarDeuda(this.deuda, this.cc.id).subscribe(rs=> console.log("finalizado"))
            )
          )
        this.procede = true;
      }
    } catch (error) {
      this.registroServicio.registrarCliente(this.cliente).subscribe(
        res => this.c = res,
        err => console.log("clienteerror"),
        () => this.registroServicio.registrarCuentaCredito(this.cuentaCredito, this.c.id).subscribe(
          r => this.cc = r,
          err=> console.log("cuentacreditoerror"),
          ()=>this.registroServicio.registrarDeuda(this.deuda, this.cc.id).subscribe(rs=> console.log("finalizado"))
          )
        )
        this.procede = true;
    }
  }

  listaClientes(){
    this.listadoService.listadoCliente().subscribe(
      res => this.clientes = res
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
