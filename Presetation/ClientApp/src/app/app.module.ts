import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';

import {JwtInterceptor} from './services/jwt.interceptor';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteConsultaComponent } from './componentes/cliente/cliente-consulta/cliente-consulta.component';
import { ClienteRegistroComponent } from './componentes/cliente/cliente-registro/cliente-registro.component';
import { ClienteEditaComponent } from './componentes/cliente/cliente-edita/cliente-edita.component';
import { ProductoConsultaComponent } from './componentes/producto/producto-consulta/producto-consulta.component';
import { ProductoRegistroComponent } from './componentes/producto/producto-registro/producto-registro.component';
import { ProductoEditaComponent } from './componentes/producto/producto-edita/producto-edita.component';
import { ReservaConsultaComponent } from './componentes/reserva/reserva-consulta/reserva-consulta.component';
import { ReservaRegistroComponent } from './componentes/reserva/reserva-registro/reserva-registro.component';
import { ReservaEditaComponent } from './componentes/reserva/reserva-edita/reserva-edita.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { FiltroClientePipe } from './pipe/filtro-cliente.pipe';
import { FiltroRecepcionistaPipe } from './pipe/filtro-recepcionista.pipe';
import { FiltroHabitacionPipe } from './pipe/filtro-habitacion.pipe';
import { FiltroProductoPipe } from './pipe/filtro-producto.pipe';
import { FiltroReservaPipe } from './pipe/filtro-reserva.pipe';
import { RecepcionistaConsultaComponent } from './componentes/recepcionista/recepcionista-consulta/recepcionista-consulta.component';
import { RecepcionistaRegistroComponent } from './componentes/recepcionista/recepcionista-registro/recepcionista-registro.component';
import { RecepcionistaEditaComponent } from './componentes/recepcionista/recepcionista-edita/recepcionista-edita.component';
import { HabitacionConsultaComponent } from './componentes/habitacion/habitacion-consulta/habitacion-consulta.component';
import { HabitacionRegistroComponent } from './componentes/habitacion/habitacion-registro/habitacion-registro.component';
import { HabitacionEditaComponent } from './componentes/habitacion/habitacion-edita/habitacion-edita.component';
import { BannerAdminComponent } from './componentes/banners/banner-admin/banner-admin.component';
import { BannerClienteComponent } from './componentes/banners/banner-cliente/banner-cliente.component';
import { BannerRecepcionistaComponent } from './componentes/banners/banner-recepcionista/banner-recepcionista.component';
import { InicioHotelComponent } from './componentes/inicio-hotel/inicio-hotel.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioAdminComponent } from './componentes/banners/inicio-admin/inicio-admin.component';
import { InicioInicioComponent } from './componentes/banners/inicio-inicio/inicio-inicio.component';
import { ReservaInicioComponent } from './componentes/reserva/reserva-inicio/reserva-inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioClienteComponent } from './componentes/banners/inicio-cliente/inicio-cliente.component';
import { InicioRecepcionistaComponent } from './componentes/banners/inicio-recepcionista/inicio-recepcionista.component';
import { FacturaComponent } from './componentes/factura/factura.component';
import { FiltroFacturaPipe } from './pipe/filtro-factura.pipe';
import { ClienteInformacionComponent } from './componentes/cliente/cliente-informacion/cliente-informacion.component';
import { ReservaClienteComponent } from './componentes/reserva/reserva-cliente/reserva-cliente.component';
import { ClienteSubComponent } from './componentes/cliente/cliente-sub/cliente-sub.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { FiltroInventarioPipe } from './pipe/filtro-inventario.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ClienteConsultaComponent,
    ClienteRegistroComponent,
    ClienteEditaComponent,
    RecepcionistaConsultaComponent,
    RecepcionistaRegistroComponent,
    RecepcionistaEditaComponent,
    HabitacionConsultaComponent,
    HabitacionRegistroComponent,
    HabitacionEditaComponent,
    ProductoConsultaComponent,
    ProductoRegistroComponent,
    ProductoEditaComponent,
    ReservaConsultaComponent,
    ReservaRegistroComponent,
    ReservaEditaComponent,
    AlertModalComponent,
    FiltroClientePipe,
    FiltroRecepcionistaPipe,
    FiltroHabitacionPipe,
    FiltroProductoPipe,
    FiltroReservaPipe,
    BannerAdminComponent,
    BannerClienteComponent,
    BannerRecepcionistaComponent,
    InicioHotelComponent,
    LoginComponent,
    InicioAdminComponent,
    InicioInicioComponent,
    ReservaInicioComponent,
    InicioClienteComponent,
    FacturaComponent,
    InicioRecepcionistaComponent,
    FiltroFacturaPipe,
    ClienteInformacionComponent,
    ReservaClienteComponent,
    ClienteSubComponent,
    InventarioComponent,
    FiltroInventarioPipe

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: '', component: InicioAdminComponent, pathMatch: 'full' },
    ]) 

  ],
  entryComponents:[AlertModalComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
