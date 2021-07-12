import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { Pago } from 'src/app/model/pago';
import * as $ from "jquery";
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { OperacionService } from 'src/app/servicio/operacion.service';
import { RegistroService } from 'src/app/servicio/registro.service';
import { Deuda } from 'src/app/model/deuda';
import { Venta } from 'src/app/model/venta';

$(document).ready(function(){
  $(document).on("click",".liquidar-btn", function(){
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

  $(document).on("click",".liquidar-btn2", function(){
    $(".overlay3").addClass('active');
    $(".popup-search3").addClass('active');
    $("button").click(function(){
      $(".popup-search3").removeClass('active');
      $(".overlay3").removeClass('active');
    });
    $("button").click(function(){
      $(".popup-search3").removeClass('active');
      $(".overlay3").removeClass('active');
      
    });
  });
  $(document).on("click",".icon-cross",(function(){
    $(".popup-search3").removeClass('active');
    $(".overlay3").removeClass('active');
  }));
});

@Component({
  selector: 'app-detalle-deuda',
  templateUrl: './detalle-deuda.component.html',
  styleUrls: ['./detalle-deuda.component.css']
})
export class DetalleDeudaComponent implements OnInit {
  codigoCCredito: number;
  cuentaCredito: CuentaCredito;
  fechaActual:Date = new Date();
  fechaApertura: String;
  fechaAct:String;
  fechaLimite: String;
  fechaPago:String;
  consumo: number;
  deuda: Deuda;
  interes:number;
  total:number;
  mora:number;
  valorMortizacion:number;
  pago:Pago = new Pago();
  mortizar:Boolean;
  venta:Venta = new Venta();
  numDias:number;

  constructor(private dataRoute: ActivatedRoute, private datePipe:DatePipe, private operacionService:OperacionService, private busquedaService:BusquedaService,
    private registroService:RegistroService, private router: Router) { 
    this.codigoCCredito = parseInt(this.dataRoute.snapshot.paramMap.get('id'));
    this.numDias = parseInt(this.dataRoute.snapshot.paramMap.get('id2'));
  }

  ngOnInit(): void {
    this.fechaActual = this.add_days(this.fechaActual, this.numDias)
    this.fechaAct = this.datePipe.transform(this.fechaActual, 'yyyy-MM-dd')
    this.busquedaService.buscarCuentaCredito(this.codigoCCredito).subscribe(
      res=>this.cuentaCredito = res,
      err=>console.log("mal!!"),
      ()=>{
          if(this.cuentaCredito.activo == true){
            this.operacionService.deudaTotal(this.cuentaCredito.deuda.id, this.fechaActual).subscribe(
              res => this.deuda = res,
              err =>console.log("mal"),
              ()=>{
                this.consumo = Math.round((this.cuentaCredito.saldoConsumido + Number.EPSILON) * 100)/100
                this.interes = Math.round((this.deuda.interes + Number.EPSILON) * 100)/100
                this.total = Math.round((this.deuda.total + Number.EPSILON) * 100)/100
                this.mora = this.deuda.mora;
                this.fechaApertura = this.datePipe.transform(this.cuentaCredito.fechaApertura, 'yyyy-MM-dd')
                this.fechaLimite = this.datePipe.transform(this.cuentaCredito.fechaLimite, 'yyyy-MM-dd')
                if(this.fechaAct >= this.fechaLimite) this.mortizar = false;
                else this.mortizar = true;
              }
            )
          }
          else{
            this.consumo = Math.round((this.cuentaCredito.saldoConsumido + Number.EPSILON) * 100)/100
            this.interes = Math.round((this.cuentaCredito.deuda.interes + Number.EPSILON) * 100)/100
            this.total = Math.round((this.cuentaCredito.deuda.total + Number.EPSILON) * 100)/100
            this.fechaApertura = this.datePipe.transform(this.cuentaCredito.fechaApertura, 'yyyy-MM-dd')
            this.fechaLimite = this.datePipe.transform(this.cuentaCredito.fechaLimite, 'yyyy-MM-dd')
          }
      }
      )
  }
  
  registrarPago(){
    this.pago.fechaPago = this.fechaActual
    this.pago.importe = this.cuentaCredito.deuda.total;
    this.registroService.registrarPago(this.pago, this.cuentaCredito.deuda.id).subscribe(res => console.log("bien"))
  }

  registroVenta(){
    
    this.venta.descripcion = "Amortización de deuda"
    this.venta.delivery = false;
    this.venta.total = Number(-this.valorMortizacion);
    this.venta.fechaConsumo = this.fechaActual
    this.venta.importe = Number(this.venta.total);
    this.registroService.registrarVenta(this.venta, this.codigoCCredito).subscribe(
      res=>console.log("bien!"),
      err=>console.log("mal!!!"),
      ()=>{
        this.operacionService.actualizarConsumo(this.codigoCCredito, new Date()).subscribe(
          res => console.log("se concreto!!"),
          err=>console.log("mal"),
          ()=>{
            
          }
        );
      }
    );
    this.router.navigate(['/listaclientes/1'])
  }

  registrarMortizacion(){
    var countDecimals = function(value) {
      if (Math.floor(value) !== value)
          return value.toString().split(".")[1].length || 0;
      return 0;
    }

    try {
      if((this.valorMortizacion > this.consumo + this.interes) || countDecimals(this.valorMortizacion) > 2){
        alert("Monto introducido erroneo")
      }
      else{
        this.registroVenta();
      }
    } catch (error) {
      this.registroVenta();
    }
  }

  esSoles(){
    if(this.cuentaCredito.moneda == "Soles") return true;
  }

  esDolares(){
    if(this.cuentaCredito.moneda == "Dolares") return true;
  }

  esActivo(){
    if(this.cuentaCredito.activo == true) return true;
  }

  esInactivo(){
    if(this.cuentaCredito.activo == false) return true;
  }

  calcFechaPago(){
    this.fechaPago = this.datePipe.transform(this.cuentaCredito.deuda.pago.fechaPago, 'yyyy-MM-dd');
    return this.fechaPago;
  }

  add_days(dt, n) 
  {
    return new Date(dt.setDate(dt.getDate() + n));      
  }
  esMortizar(){
    if(this.esActivo){
      if(this.mortizar == true) return true
    }
    else{
      return false;
    }
  }
  noMortizar(){
    if(this.esActivo){
      if(this.mortizar == false) return true
    }
    else{
      return false;
    }
  }

}
