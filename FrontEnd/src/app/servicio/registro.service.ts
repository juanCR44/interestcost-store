import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../model/cliente';
import { CuentaCredito } from '../model/cuenta-credito';
import { Pago } from '../model/pago';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private urlBase = "http://localhost:8080";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private http: HttpClient,private router: Router) { }

  registrarCliente(cliente: object): Observable<any>{
    // codigo del bodeguero
    return this.http.post(this.urlBase + '/registrarcliente/1', cliente, {headers:this.httpHeaders}).pipe(
      map(response => response as Cliente)
    );
  }

  registrarCuentaCredito(cuentaCredito: object,codigo:number): Observable<any>{
    // codigo del cliente
    return this.http.post(this.urlBase + '/registrarcuentacredito/' + codigo, cuentaCredito, {headers:this.httpHeaders}).pipe(
      map(response => response as CuentaCredito)
    );;
  }

  registrarDeuda(deuda: object, codigo:number): Observable<Object>{
    // codigo de cuentacredito
    return this.http.post(this.urlBase + '/registrardeuda/' + codigo, deuda, {headers:this.httpHeaders});
  }

  registrarVenta(venta: object, codigo:number):Observable<Object>{
    console.log(this.urlBase + '/registrarventa/' + codigo)
    return this.http.post(this.urlBase + '/registrarventa/' + codigo, venta, {headers:this.httpHeaders});
  }

  registrarPago(pago:Pago, codigo:number):Observable<Object>{
    console.log(this.urlBase + '/registrarpago/' + codigo)
    return this.http.post(this.urlBase + '/registrarpago/' + codigo, pago, {headers:this.httpHeaders});
  }
}
