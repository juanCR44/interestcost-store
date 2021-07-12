import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Venta } from 'src/app/model/venta';
import { BusquedaService } from 'src/app/servicio/busqueda.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {
  venta: Venta;
  codigoVenta: any;
  fechaConsumo: String

  constructor(private dataRoute: ActivatedRoute, private busquedaService:BusquedaService, private datePipe:DatePipe) { 
    this.codigoVenta = parseInt(this.dataRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.busquedaService.buscarVenta(this.codigoVenta).subscribe(
      res=>this.venta = res,
      err=>console.log("mal!"),
      () => this.fechaConsumo = this.datePipe.transform(this.venta.fechaConsumo, 'yyyy-MM-dd')
      );
  }

  tieneDelivery(){
    if(this.venta.delivery == true) return true
  }

  noTieneDelivery(){
    if(this.venta.delivery == false) return true
  }

}
