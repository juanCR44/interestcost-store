import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { Venta } from 'src/app/model/venta';
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { ListadoService } from 'src/app/servicio/listado.service';
import { OperacionService } from 'src/app/servicio/operacion.service';

@Component({
  selector: 'app-cliente-movimiento',
  templateUrl: './cliente-movimiento.component.html',
  styleUrls: ['./cliente-movimiento.component.css']
})
export class ClienteMovimientoComponent implements OnInit {

  cuentaCredito:CuentaCredito;
  ventas: Venta[] = [];
  actualDate:string;
  limitDate:string;
  fechaConsumos: String[] = [];
  codigoCCredito: number;
  fechaActual:Date = new Date();
  interes:number;
  consumido:number;
  disponible:number;
  total:number;
  numDias:number;

  constructor(private dataRoute: ActivatedRoute, private busquedaService:BusquedaService, private datePipe:DatePipe, private listadoService:ListadoService,
    private operacionService:OperacionService) {
    this.codigoCCredito = parseInt(this.dataRoute.snapshot.paramMap.get('id'))
    console.log(this.codigoCCredito)
   }

  ngOnInit(): void {
    this.busquedaService.buscarCuentaCredito(this.codigoCCredito).subscribe(
      res=>this.cuentaCredito = res,
      err =>console.log("mal!"),
      ()=>{
        this.numDias = 30
        this.fechaActual = this.add_days(this.fechaActual, this.numDias);
        this.consumido = Math.round((this.cuentaCredito.saldoConsumido + Number.EPSILON) * 100)/100
        this.disponible = Math.round((this.cuentaCredito.saldoDisponible + Number.EPSILON) * 100)/100
        this.operacionService.actualizarDeuda(this.cuentaCredito.id, this.fechaActual).subscribe(
          res=>this.cuentaCredito = res,
          err =>console.log("mal"),
          () =>{
            this.interes = this.cuentaCredito.deuda.interes;
            this.total = this.cuentaCredito.deuda.total;
          }
        );
        this.actualDate = this.datePipe.transform(this.cuentaCredito.fechaApertura, 'yyyy-MM-dd');
        this.limitDate = this.datePipe.transform(this.cuentaCredito.fechaLimite, 'yyyy-MM-dd');
        this.listadoService.listadoVenta(this.codigoCCredito).subscribe(res => {
          this.ventas = res;
          for(var x = 0; x < this.ventas.length; x=x+1){
            this.fechaConsumos.push(this.datePipe.transform(this.ventas[x].fechaConsumo, 'yyyy-MM-dd'))
          }
        }); 
      }
      )
  }

  add_days(dt, n) 
  {
    return new Date(dt.setDate(dt.getDate() + n));      
  }

  esSoles(){
    if(this.cuentaCredito.moneda == "Soles") return true;
  }

  esDolares(){
    if(this.cuentaCredito.moneda == "Dolares") return true;
  }

  calcInteres(){
    return  Math.round((this.interes + Number.EPSILON) * 100)/100
  }

  calcDeuda(){
    return  Math.round((this.total + Number.EPSILON) * 100)/100
  }
}
