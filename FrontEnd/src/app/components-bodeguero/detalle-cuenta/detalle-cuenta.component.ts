import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { ListadoService } from 'src/app/servicio/listado.service';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css']
})
export class DetalleCuentaComponent implements OnInit {
  codigoCliente: number;
  cliente:Cliente;
  cuentaCreditos: CuentaCredito[] = [];
  hayActivo: boolean = false;
  vecesMora: number = 0;
  vecesPagos: number = 0;
  fecha:String;

  constructor(private dataRoute: ActivatedRoute, private busquedaService:BusquedaService, private datePipe:DatePipe, private listadoService:ListadoService) { 
    this.codigoCliente = parseInt(this.dataRoute.snapshot.paramMap.get('id'))
    console.log(this.codigoCliente)
  }

  ngOnInit(): void {
    this.busquedaService.buscarCliente(this.codigoCliente).subscribe(
      res => this.cliente = res,
      err=>console.log("mal!!"),
      ()=>{
        this.listadoService.cuentasxCliente(this.codigoCliente).subscribe(res=>this.cuentaCreditos = res)
        for(let cc of this.cliente.cuentaCredito){
          if (cc.activo == true) {this.hayActivo = true; break;}
        }
        for(let cc of this.cliente.cuentaCredito){
          if(cc.deuda.mora> 0){
            this.vecesMora += 1
          }
          if(cc.deuda.pago != null){
            this.vecesPagos += 1
          }
        }
      }
    )
  }

  esActivo(){
    if(this.hayActivo == true) return true;
  }

  noActivo(){
    if(this.hayActivo == false) return true;
  }

  esActivoIndice(index){
    if(this.cuentaCreditos[index].activo == true) return true;
  }

  noActivoIndice(index){
    if(this.cuentaCreditos[index].activo == false) return true;
  }

  esSoles(index){
    if(this.cuentaCreditos[index].moneda == "Soles") return true;
  }
  
  esDolares(index){
    if(this.cuentaCreditos[index].moneda == "Dolares") return true;
  }

  importeTotal(index){
    if(this.cuentaCreditos[index].deuda.pago == null)
      return "Pendiente";
    else{
      return Math.round((this.cuentaCreditos[index].deuda.pago.importe + Number.EPSILON)*100 )/100;
   }
  }

  fechaPago(index){
    if(this.cuentaCreditos[index].deuda.pago == null)
      return "Pendiente";
    else{
      this.fecha = this.datePipe.transform(this.cuentaCreditos[index].deuda.pago.fechaPago, 'yyyy-MM-dd')
      return this.fecha;
    }
  }
}
