import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { CuentaCredito } from 'src/app/model/cuenta-credito';
import { BusquedaService } from 'src/app/servicio/busqueda.service';
import { ListadoService } from 'src/app/servicio/listado.service';


@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent implements OnInit {

  clientes: Cliente[] = []
  dni:string;
  cuentaCredito: String[] = []
  hayActivo: boolean;

  constructor(private listadoService:ListadoService, private busquedaService: BusquedaService) { }

  ngOnInit(): void {
    this.listaClientes();
  }

  listaClientes(){
    this.listadoService.listadoCliente().subscribe(
      res => this.clientes = res,
      err => console.log("mal!!"),
      ()=>{
        for(let x of this.clientes){
          this.hayActivo = false;
          for(let y of x.cuentaCredito){
            if(y.activo == true) {
              this.cuentaCredito.push("Activo");
              this.hayActivo = true;
              break;
            }
          }
          if(this.hayActivo == false)
            this.cuentaCredito.push("Inactivo")
        }
      }
    )
  }

  buscarCliente(){
    this.busquedaService.buscarClientexDni(this.dni).subscribe(res => this.clientes = res)
  }

  esActivo(index:number){
    if(this.cuentaCredito[index] == "Activo") return true;
  }

  esInactivo(index:number){
    if(this.cuentaCredito[index] == "Inactivo") return true;
  }
}
