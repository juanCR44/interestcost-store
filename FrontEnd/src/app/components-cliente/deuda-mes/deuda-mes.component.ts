import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { Deuda } from 'src/app/model/deuda';
import { Pago } from 'src/app/model/pago';
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { OperacionService } from 'src/app/servicio/operacion.service';
import { RegistroService } from 'src/app/servicio/registro.service';

@Component({
  selector: 'app-deuda-mes',
  templateUrl: './deuda-mes.component.html',
  styleUrls: ['./deuda-mes.component.css']
})
export class DeudaMesComponent implements OnInit {

  codigoCCredito: number;
  cuentaCredito: CuentaCredito;
  fechaActual:Date = new Date();
  fechaApertura: String;
  fechaAct:String;
  fechaLimite: String;
  fechaPago:String;
  consumo: number;
  interes:number;
  deuda: Deuda;
  total:number;
  pago:Pago = new Pago();
  numDias:number;

  constructor(private dataRoute: ActivatedRoute, private datePipe:DatePipe, private operacionService:OperacionService, private busquedaService:BusquedaService,
    private registroService:RegistroService) { 
    this.codigoCCredito = parseInt(this.dataRoute.snapshot.paramMap.get('id'))
    this.numDias = parseInt(this.dataRoute.snapshot.paramMap.get('id2'))
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
              this.interes = Math.round((this.deuda.interes + Number.EPSILON) * 100000000)/100000000
              this.total = Math.round((this.deuda.total + Number.EPSILON) * 100)/100
              this.fechaApertura = this.datePipe.transform(this.cuentaCredito.fechaApertura, 'yyyy-MM-dd')
              this.fechaLimite = this.datePipe.transform(this.cuentaCredito.fechaLimite, 'yyyy-MM-dd')
            }
          )
        }
        else{
          this.consumo = Math.round((this.cuentaCredito.saldoConsumido + Number.EPSILON) * 100)/100
          this.interes = Math.round((this.cuentaCredito.deuda.interes + Number.EPSILON) * 100000000)/100000000
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
    this.registroService.registrarPago(this.pago, this.cuentaCredito.deuda.id).subscribe(res => console.log("hola!"))
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

}
