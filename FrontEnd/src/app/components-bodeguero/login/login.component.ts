import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Bodeguero } from 'src/app/model/bodeguero';
import { BusquedaService } from 'src/app/servicio/busqueda.service';

$(document).ready(function(){
  $(document).on("click",".right-btn",(function(){
    $(".right-btn").addClass('active');
    $(".overlay3").addClass('active');
    $(".popup-search3").addClass('active');
  }));
  $(document).on("click",".icon-cross",(function(){
    $(".right-btn").removeClass('active');
    $(".overlay3").removeClass('active');
    $(".popup-search3").removeClass('active');
  }));
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bodeguero:Bodeguero;
  nombre:string;
  contrasena:string;

  constructor(private busquedaService:BusquedaService, private router: Router) { }

  ngOnInit(): void {
    this.busquedaService.buscarBodeguero(1).subscribe(res => this.bodeguero = res)
  }

  loginBodeguero(){
    if(this.nombre == this.bodeguero.nombre && this.contrasena == this.bodeguero.password){
      this.router.navigate(['/listaclientes/' + this.bodeguero.id]);
    }
    else{
      alert("Usuario o contraseña incorrectos");
    }
  }
}
