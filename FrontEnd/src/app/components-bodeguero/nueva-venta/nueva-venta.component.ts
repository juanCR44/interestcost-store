import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { Venta } from 'src/app/model/venta';
import * as $ from "jquery";
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { OperacionService } from 'src/app/servicio/operacion.service';
import { RegistroService } from 'src/app/servicio/registro.service';
import { FormGroup } from '@angular/forms';

$(document).ready(function(){
  $(document).on("click",".popup-trigger", function(){
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
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {
  codigoCCredito:number;
  total:number;
  venta:Venta = new Venta();
  delivery :Boolean = false;
  fechaActual:Date = new Date();
  cuentaCredito: CuentaCredito;
  disponible: number;
  numDias:number;

  constructor(private dataRoute: ActivatedRoute, private registroService:RegistroService, private operacionService:OperacionService,private busquedaService:BusquedaService) { 
    this.codigoCCredito = parseInt(this.dataRoute.snapshot.paramMap.get('id'));
    this.numDias = parseInt(this.dataRoute.snapshot.paramMap.get('id2'));
  }

  ngOnInit(): void {
    this.busquedaService.buscarCuentaCredito(this.codigoCCredito).subscribe(
      res=>this.cuentaCredito = res,
      err=> console.log("mal!"),
      ()=>{
        this.disponible = Math.round((this.cuentaCredito.saldoDisponible + Number.EPSILON) * 100)/100
      }
      )
  }

  registroVenta(){
    this.venta.delivery = this.delivery;
    this.venta.total = Number(this.total);
    this.fechaActual = this.add_days(this.fechaActual, this.numDias);
    this.venta.fechaConsumo = this.fechaActual
    if(this.delivery == true){
      this.venta.importe = Number(this.venta.total) + 5.0;
    }
    else{
      this.venta.importe = Number(this.venta.total);
    }
    console.log("nani");
    this.registroService.registrarVenta(this.venta, this.codigoCCredito).subscribe(
      res=>console.log("bien!"),
      err=>console.log("mal!!!"),
      ()=>{
        this.operacionService.actualizarConsumo(this.codigoCCredito, new Date()).subscribe(res => console.log("se concreto!!"));
      }
      );
  }

  toggleDelivery(){
    this.delivery = !this.delivery;
    console.log(this.delivery);
  }

  add_days(dt, n) 
  {
    return new Date(dt.setDate(dt.getDate() + n));      
  }

  esDolares(){
    if(this.cuentaCredito.moneda == "Dolares") return true;
  }

  esSoles(){
    if(this.cuentaCredito.moneda == "Soles") return true;
  }

  validateValue(event:number){
    if (event > this.cuentaCredito.saldoDisponible) {
      this.total = this.cuentaCredito.saldoDisponible;
    } else if (event < 0) {
      this.total = 0;
    } else {
      this.total = event;
    }
  }
}
