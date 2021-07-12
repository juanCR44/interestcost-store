import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteMovimientoComponent } from './components-bodeguero/cliente-movimiento/cliente-movimiento.component';
import { DetalleCuentaComponent } from './components-bodeguero/detalle-cuenta/detalle-cuenta.component';
import { DetalleDeudaComponent } from './components-bodeguero/detalle-deuda/detalle-deuda.component';
import { DetalleVentaComponent } from './components-bodeguero/detalle-venta/detalle-venta.component';
import { ListadoClienteComponent } from './components-bodeguero/listado-cliente/listado-cliente.component';
import { ListadoCuentaActivoComponent } from './components-bodeguero/listado-cuenta-activo/listado-cuenta-activo.component';
import { ListadoCuentaInactivoComponent } from './components-bodeguero/listado-cuenta-inactivo/listado-cuenta-inactivo.component';
import { LoginComponent } from './components-bodeguero/login/login.component';
import { NuevaVentaComponent } from './components-bodeguero/nueva-venta/nueva-venta.component';
import { RegistrarClienteComponent } from './components-bodeguero/registrar-cliente/registrar-cliente.component';
import { RenovarClienteComponent } from './components-bodeguero/renovar-cliente/renovar-cliente.component';
import { CuentaCreditoComponent } from './components-cliente/cuenta-credito/cuenta-credito.component';
import { DetalleConsumoComponent } from './components-cliente/detalle-consumo/detalle-consumo.component';
import { DeudaMesComponent } from './components-cliente/deuda-mes/deuda-mes.component';
import { MovimientoComponent } from './components-cliente/movimiento/movimiento.component';

const routes: Routes = [
  {path:'newcliente/:id', component: RegistrarClienteComponent},
  {path:'listaclientes/:id', component: ListadoClienteComponent},
  {path:'clientemovimiento/:id', component: ClienteMovimientoComponent},
  {path:'nuevaventa/:id/:id2', component: NuevaVentaComponent},
  {path: 'detalleventa/:id', component:DetalleVentaComponent},
  {path: 'detalledeuda/:id/:id2', component:DetalleDeudaComponent},
  {path: 'cuentasactivas/:id', component:ListadoCuentaActivoComponent},
  {path: 'cuentasinactivas/:id', component:ListadoCuentaInactivoComponent},
  {path: 'detallecuenta/:id', component:DetalleCuentaComponent},
  {path: 'renovarcuenta/:id', component:RenovarClienteComponent},
  {path: 'login', component:LoginComponent},

  {path: 'cuentacredito/:id', component:CuentaCreditoComponent},
  {path: 'detalleconsumo/:id', component:DetalleConsumoComponent},
  {path: 'deudacliente/:id/:id2', component:DeudaMesComponent},
  {path: 'movimientocliente/:id', component:MovimientoComponent},
  {path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
