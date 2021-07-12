import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bodeguero } from '../model/bodeguero';
import { Cliente } from '../model/cliente';
import { CuentaCredito } from '../model/cuenta-credito';
import { Venta } from '../model/venta';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private urlBase = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  buscarClientexDni(dni:String): Observable<any>{
    return this.http.get(this.urlBase+"/buscarclientedni/" + dni).pipe(
      map(response => response as Cliente)
    );
  }

  buscarCliente(codigo:number): Observable<any>{
    return this.http.get(this.urlBase+"/buscarcliente/" + codigo).pipe(
      map(response => response as Cliente)
    );
  }

  buscarCuentaCredito(codigo:number): Observable<any>{
    return this.http.get(this.urlBase+"/buscarcuentacredito/" + codigo).pipe(
      map(response => response as CuentaCredito)
    );
  }

  buscarCuentaCreditoActivoxCliente(codigo:number): Observable<any>{
    return this.http.get(this.urlBase+"/cuentacreditoactivoxcliente/" + codigo).pipe(
      map(response => response as CuentaCredito)
    );
  }

  buscarCuentaCreditoxDni(dni:String): Observable<any>{
    return this.http.get(this.urlBase+"/cuentacreditoxdni/" + dni).pipe(
      map(response => response as CuentaCredito)
    );
  }


  buscarVenta(codigo:number):Observable<any>{
    return this.http.get(this.urlBase+"/buscarventa/" + codigo).pipe(
      map(response => response as Venta)
    );
  }

  buscarBodeguero(codigo:number):Observable<any>{
    return this.http.get(this.urlBase+"/buscarbodeguero/" + codigo).pipe(
      map(response => response as Bodeguero)
    );
  }
}
