import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClienteRegistroComponent } from './componentes/cliente/cliente-registro/cliente-registro.component';
import { ClienteConsultaComponent } from './componentes/cliente/cliente-consulta/cliente-consulta.component';
import { ClienteEditaComponent } from './componentes/cliente/cliente-edita/cliente-edita.component';
import { RecepcionistaRegistroComponent } from './componentes/recepcionista/recepcionista-registro/recepcionista-registro.component';
import { RecepcionistaConsultaComponent } from './componentes/recepcionista/recepcionista-consulta/recepcionista-consulta.component';
import { RecepcionistaEditaComponent } from './componentes/recepcionista/recepcionista-edita/recepcionista-edita.component';
import { ProductoEditaComponent } from './componentes/producto/producto-edita/producto-edita.component';
import { ProductoConsultaComponent } from './componentes/producto/producto-consulta/producto-consulta.component';
import { ProductoRegistroComponent } from './componentes/producto/producto-registro/producto-registro.component';
import { HabitacionRegistroComponent } from './componentes/habitacion/habitacion-registro/habitacion-registro.component';
import { HabitacionConsultaComponent } from './componentes/habitacion/habitacion-consulta/habitacion-consulta.component';
import { ReservaRegistroComponent } from './componentes/reserva/reserva-registro/reserva-registro.component';
import { HomeComponent } from './home/home.component';
import { HabitacionEditaComponent } from './componentes/habitacion/habitacion-edita/habitacion-edita.component';
import { ReservaConsultaComponent } from './componentes/reserva/reserva-consulta/reserva-consulta.component';
import { ReservaEditaComponent } from './componentes/reserva/reserva-edita/reserva-edita.component';
import { InicioAdminComponent } from './componentes/banners/inicio-admin/inicio-admin.component';
import { InicioInicioComponent } from './componentes/banners/inicio-inicio/inicio-inicio.component';
import { InicioHotelComponent } from './componentes/inicio-hotel/inicio-hotel.component';
import { ReservaInicioComponent } from './componentes/reserva/reserva-inicio/reserva-inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioClienteComponent } from './componentes/banners/inicio-cliente/inicio-cliente.component';
import { InicioRecepcionistaComponent } from './componentes/banners/inicio-recepcionista/inicio-recepcionista.component';

import { AuthGuard } from './services/auth.guard';
import { FacturaComponent } from './componentes/factura/factura.component';

const routes: Routes = [
  { 
    path: '', 
    component: InicioHotelComponent, 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    component: HomeComponent,canActivate: [AuthGuard] 
  },
  
  // cliente-------------------------------------------------------------------------------------------------

  {
    path: 'clienteRegistro',
    component: ClienteRegistroComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'clienteConsulta',
    component: ClienteConsultaComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'clienteEdita/:id',
    component: ClienteEditaComponent,canActivate: [AuthGuard] 
  },

  // recepcionista--------------------------------------------------------------------------------------
  {
    path: 'recepcionistaConsulta',
    component: RecepcionistaConsultaComponent ,canActivate: [AuthGuard] 
  },
  {
    path: 'recepcionistaEdita/:id',
    component: RecepcionistaEditaComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'recepcionistaRegistro',
    component: RecepcionistaRegistroComponent,canActivate: [AuthGuard] 
  },
 
  // producto--------------------------------------------------------------------------------------------

  {
    path: 'productoEdita/:id',
    component: ProductoEditaComponent,canActivate: [AuthGuard]  
  },
  {
    path: 'productoConsulta',
    component: ProductoConsultaComponent,canActivate: [AuthGuard]  
  },
  {
    path: 'productoRegistra',
    component: ProductoRegistroComponent,canActivate: [AuthGuard] 
  },

  // habitacion-----------------------------------------------------------------------------------------

  {
    path: 'habitacionRegistro',
    component: HabitacionRegistroComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'habitacionConsulta',
    component: HabitacionConsultaComponent,canActivate: [AuthGuard] 
  },  
  {
    path: 'habitacionEdita/:id',
    component: HabitacionEditaComponent,canActivate: [AuthGuard] 
  },

  // reserva--------------------------------------------------------------------------------------------

  {
    path: 'reservaRegistro',
    component: ReservaRegistroComponent
  },
  {
    path: 'reservaConsulta',
    component: ReservaConsultaComponent
  },
  {
    path: 'reservaEdita/:id',
    component: ReservaEditaComponent,canActivate: [AuthGuard]  
  },
  {
    path: 'inicioAdmin',
    component: InicioAdminComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'inicioInicio',
    component: InicioInicioComponent,canActivate: [AuthGuard]  
  },
  {
    path: 'inicioHotel',
    component: InicioHotelComponent 
  },
  {
    path: 'realizarReserva',
    component: ReservaInicioComponent
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'inicioCliente',
    component: InicioClienteComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'inicioRecepcionista',
    component: InicioRecepcionistaComponent,canActivate: [AuthGuard] 
  },
  {
    path: 'facturaConsulta',
    component: FacturaComponent,canActivate: [AuthGuard] 
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
 
})
export class AppRoutingModule { }
