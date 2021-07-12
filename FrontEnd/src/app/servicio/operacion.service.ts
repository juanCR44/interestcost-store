import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CuentaCredito } from '../model/cuenta-credito';
import { Deuda } from '../model/deuda';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  private urlBase = "http://localhost:8080";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private http: HttpClient) { }

  actualizarConsumo(codigo:number, fecha:Date){
    return this.http.post(this.urlBase+"/actualizarconsumo/" + codigo,fecha,{headers:this.httpHeaders});
  }


  actualizarDeuda(codigo:number, fecha:Date){
    return this.http.post(this.urlBase+"/actualizardeuda/" + codigo,fecha,{headers:this.httpHeaders}).pipe(
      map(response => response as CuentaCredito)
    );
  }

  deudaTotal(codigo:number, fecha:Date): Observable<any>{
    return this.http.post(this.urlBase+"/deudatotal/" + codigo,fecha,{headers:this.httpHeaders}).pipe(
      map(response => response as Deuda)
    );
  }
}
