import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { ListadoService } from 'src/app/servicio/listado.service';

@Component({
  selector: 'app-listado-cuenta-inactivo',
  templateUrl: './listado-cuenta-inactivo.component.html',
  styleUrls: ['./listado-cuenta-inactivo.component.css']
})
export class ListadoCuentaInactivoComponent implements OnInit {

  cuentaCredito: CuentaCredito[] = [];
  dni:string;
  hayActivo: boolean;
  fechaPago:String;
  
  constructor(private listadoService:ListadoService, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.listaCuentaActivas();
  }

  listaCuentaActivas(){
    //codigo del bodeguero es 1 siempre de prueba, si se quiere cambiar crear otro bodeguero y poner su codigo.
    this.listadoService.cuentasInactivasxBodeguero(1).subscribe(res => this.cuentaCredito = res)
  }

  buscarCliente(){
    this.listadoService.cuentasInactivasxDni(this.dni).subscribe(res => this.cuentaCredito = res)
  }

  calcFechaPago(index:number){
    this.fechaPago = this.datePipe.transform(this.cuentaCredito[index].deuda.pago.fechaPago, 'yyyy-MM-dd');
    return this.fechaPago;
  }
}
