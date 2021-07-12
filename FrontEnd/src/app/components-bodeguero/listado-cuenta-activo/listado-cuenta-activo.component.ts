import { Component, OnInit } from '@angular/core';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { ListadoService } from 'src/app/servicio/listado.service';

@Component({
  selector: 'app-listado-cuenta-activo',
  templateUrl: './listado-cuenta-activo.component.html',
  styleUrls: ['./listado-cuenta-activo.component.css']
})
export class ListadoCuentaActivoComponent implements OnInit {

  cuentaCredito: CuentaCredito[] = [];
  dni:string;
  hayActivo: boolean;

  constructor(private listadoService:ListadoService, private busquedaService: BusquedaService) { }

  ngOnInit(): void {
    this.listaCuentaActivas();
  }

  listaCuentaActivas(){
    //codigo del bodeguero es 1 siempre de prueba, si se quiere cambiar crear otro bodeguero y poner su codigo.
    this.listadoService.cuentasActivasxBodeguero(1).subscribe(res => this.cuentaCredito = res)
  }

  buscarCliente(){
    this.busquedaService.buscarCuentaCreditoxDni(this.dni).subscribe(res => this.cuentaCredito = res)
  }
}
