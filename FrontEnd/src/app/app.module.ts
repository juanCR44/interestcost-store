import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarClienteComponent } from './components-bodeguero/registrar-cliente/registrar-cliente.component';
import { PerfilComponent } from './components-bodeguero/perfil/perfil.component';
import { LoginComponent } from './components-bodeguero/login/login.component';
import { CuentaCreditoComponent } from './components-cliente/cuenta-credito/cuenta-credito.component';
import { DeudaMesComponent } from './components-cliente/deuda-mes/deuda-mes.component';
import { NuevaVentaComponent } from './components-bodeguero/nueva-venta/nueva-venta.component';
import { DetalleVentaComponent } from './components-bodeguero/detalle-venta/detalle-venta.component';
import { DetalleConsumoComponent } from './components-cliente/detalle-consumo/detalle-consumo.component';
import { MovimientoComponent } from './components-cliente/movimiento/movimiento.component';
import { ClienteMovimientoComponent } from './components-bodeguero/cliente-movimiento/cliente-movimiento.component';
import { ListadoClienteComponent } from './components-bodeguero/listado-cliente/listado-cliente.component';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTablesModule } from 'angular-datatables';
import { DetalleDeudaComponent } from './components-bodeguero/detalle-deuda/detalle-deuda.component';
import { ListadoCuentaActivoComponent } from './components-bodeguero/listado-cuenta-activo/listado-cuenta-activo.component';
import { ListadoCuentaInactivoComponent } from './components-bodeguero/listado-cuenta-inactivo/listado-cuenta-inactivo.component';
import { DetalleCuentaComponent } from './components-bodeguero/detalle-cuenta/detalle-cuenta.component';
import { RenovarClienteComponent } from './components-bodeguero/renovar-cliente/renovar-cliente.component';
import { ComponentMenuComponent } from './component-menu/component-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarClienteComponent,
    PerfilComponent,
    LoginComponent,
    CuentaCreditoComponent,
    DeudaMesComponent,
    NuevaVentaComponent,
    DetalleVentaComponent,
    DetalleConsumoComponent,
    MovimientoComponent,
    ClienteMovimientoComponent,
    ListadoClienteComponent,
    DetalleDeudaComponent,
    ListadoCuentaActivoComponent,
    ListadoCuentaInactivoComponent,
    DetalleCuentaComponent,
    RenovarClienteComponent,
    ComponentMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    DataTablesModule
  ],
  providers: [DatePipe,MatDatepickerModule,MatNativeDateModule,MatFormFieldModule,DataTablesModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
