import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import * as $ from "jquery";
import { Cliente } from '../model/cliente';
import { BusquedaService } from '../servicio/busqueda.service';


$(document).ready(function(){
  /*$(".menu-wrap").mouseover(function(){
    $(".item-nav").addClass('active');
  });*/
  $(document).on("mouseover",".menu-wrap .item-section",(function(){
    $(".item-nav").addClass('active');
  }));
  $(document).on("mouseover",".item-nav",(function(){
    $(".item-nav").addClass('active');
    $(".menu-wrap .item-section").addClass('active');
  }));
  $(document).on("mouseleave",".menu-wrap",(function(){
    $(".item-nav").removeClass('active');
  }));
  $(document).on("mouseleave",".item-nav",(function(){
    $(".item-nav").removeClass('active');
    $(".menu-wrap .item-section").removeClass('active');
  }));
  //
  $(document).on("mouseover",".menu-wrap2 .item-section",(function(){
    $(".item-nav2").addClass('active');
  }));
  $(document).on("mouseover",".item-nav2",(function(){
    $(".item-nav2").addClass('active');
    $(".menu-wrap2 .item-section").addClass('active');
  }));
  $(document).on("mouseleave",".menu-wrap2",(function(){
    $(".item-nav2").removeClass('active');
  }));
  $(document).on("mouseleave",".item-nav2",(function(){
    $(".item-nav2").removeClass('active');
    $(".menu-wrap2 .item-section").removeClass('active');
  }));
  //
  $(document).on("click",".popup-trigger",(function(){
    $(".overlay").addClass('active');
    $(".popup-search").addClass('active');
    $("button").click(function(){
      $(".popup-search").removeClass('active');
      $(".overlay").removeClass('active');
    });
    $("button").click(function(){
      $(".popup-search").removeClass('active');
      $(".overlay").removeClass('active');
    });
  }));
  $(document).on("click",".icon-cross",(function(){
    $(".popup-search").removeClass('active');
    $(".overlay").removeClass('active');
  }));
});

@Component({
  selector: 'app-component-menu',
  templateUrl: './component-menu.component.html',
  styleUrls: ['./component-menu.component.css']
})
export class ComponentMenuComponent implements OnInit {

  title = 'TrabFinanzas';
  cliente:Cliente[] = [];
  dni:String;
  esRegistro:Boolean = false;
  esLiquidar:Boolean = false;
  esRenovar:Boolean = false;
  codigoCCredito:number;
  id:number;
  url:string = "";
  cont:number = 0;

  constructor(private busquedaService:BusquedaService, private router: Router, private dataRoute: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    
  }

  buscarClienteRegistro(){
    this.busquedaService.buscarClientexDni(this.dni).subscribe(
      res => this.cliente = res,
      err=>console.log("mal!!!"),
      ()=> {
        var encontro = false;
        for(let c of this.cliente){
          for(let cc of c.cuentaCredito){
            if(cc.activo == true) {
              this.codigoCCredito = cc.id;
              encontro = true;
              break;
            }
          }
        }
        if(encontro){
          this.router.navigate(['/nuevaventa/' + this.codigoCCredito + "/"+ 30]);
        }
        else{
          alert("DNI ingresado incorrecto");
        }
      }
    )
  }

  buscarClienteLiquidar(){
    this.busquedaService.buscarClientexDni(this.dni).subscribe(
      res => this.cliente = res,
      err=>console.log("mal!!!"),
      ()=> {
        var encontro = false;
        for(let c of this.cliente){
          for(let cc of c.cuentaCredito){
            if(cc.activo == true) {
              this.codigoCCredito = cc.id;
              encontro = true;
              break;
            }
          }
        }
        if(encontro){
          this.router.navigate(['/detalledeuda/' + this.codigoCCredito+ "/"+ 30])
        }
        else{
          alert("DNI ingresado incorrecto");
        }
      }
    )
  }

  buscarClienteRenovar(){
    this.busquedaService.buscarClientexDni(this.dni).subscribe(
      res => this.cliente = res,
      err=>console.log("mal!!!"),
      ()=> {
        var encontro = false;
        for(let c of this.cliente){
          for(let cc of c.cuentaCredito){
            if(cc.activo == true) {
              this.codigoCCredito = cc.id;
              encontro = true;
              break;
            }
          }
        }
        if(!encontro){
          this.router.navigate(['/renovarcuenta/' + this.cliente[0].id])
        }
        else{
          alert("Cliente tiene cuenta activa");
        }
      }
    )
  }

  verificaRegistro(){
    if(this.esRegistro == true) return true;
  }

  verificaLiquidar(){
    if(this.esLiquidar == true) return true;
  }

  verificaRenovar(){
    if(this.esRenovar == true) return true;
  }

  activarRegistro(){
    this.esLiquidar = false;
    this.esRenovar = false;
    this.esRegistro = true;
  }

  activarLiquidar(){
    this.esRegistro = false;
    this.esRenovar = false;
    this.esLiquidar = true;
  }

  activarRenovar(){
    this.esRegistro = false;
    this.esLiquidar = false;
    this.esRenovar = true;
  }
}