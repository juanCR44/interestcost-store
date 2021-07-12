import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { map, catchError } from 'rxjs/operators'
import { Venta } from '../model/venta';
import { CuentaCredito } from '../model/cuenta-credito';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  private urlBase = "http://localhost:8080";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private http: HttpClient,private router: Router) { }

  listadoCliente(): Observable<any>{
    return this.http.get(this.urlBase+"/listadocliente/1").pipe(
      map(response => response as Cliente[])
    );
  }

  listadoVenta(codigo:number): Observable<any>{
    console.log(this.urlBase+"/listadoventa/" + codigo)
    return this.http.get(this.urlBase+"/listadoventa/" + codigo).pipe(
      map(response => response as Venta[])
    );
  }

  cuentasActivasxBodeguero(codigo:number){
    return this.http.get(this.urlBase+"/cuentasactivasbodeguero/" + codigo).pipe(
      map(response => response as CuentaCredito[])
    );
  }

  cuentasInactivasxBodeguero(codigo:number){
    return this.http.get(this.urlBase+"/cuentasinactivasbodeguero/" + codigo).pipe(
      map(response => response as CuentaCredito[])
    );
  }

  cuentasActivasxCliente(codigo:number){
    return this.http.get(this.urlBase+"/cuentasactivascliente/" + codigo).pipe(
      map(response => response as CuentaCredito[])
    );
  }

  cuentasxCliente(codigo:number){
    return this.http.get(this.urlBase+"/cuentascliente/" + codigo).pipe(
      map(response => response as CuentaCredito[])
    );
  }

  cuentasInactivasxCliente(codigo:number){
    return this.http.get(this.urlBase+"/cuentasinactivascliente/" + codigo).pipe(
      map(response => response as CuentaCredito[])
    );
  }

  cuentasInactivasxDni(dni:String){
    return this.http.get(this.urlBase+"/cuentacreditoinactivoxdni/" + dni).pipe(
      map(response => response as CuentaCredito[])
    );
  }
}
