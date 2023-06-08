import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/models/habitacion';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/models/reserva';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-habitacion-consulta',
  templateUrl: './habitacion-consulta.component.html',
  styleUrls: ['./habitacion-consulta.component.css']
})
export class HabitacionConsultaComponent implements OnInit {

  //prueba 
  fechaprueba: string;
  pdia: string;
  pmes: string;
  paño: string;
  baderilla: number = 0;
  contador: number = 0;
  validadorFechasIguales: number = 0;
  //finprueba

  habitaciones: Habitacion[];
  reservas: Reserva[];
  habitacion: Habitacion;
  habitacionedita: Habitacion;
  retornarHabitacion: Habitacion;
  searchText: string;
  closeResult: string;

  // Cosas agregadas del "EDITAR"
  formGroup: FormGroup;

  idn: string; public _tipo: string; public _precio: number; public _descripcion: string; public _aire: string;
    public _ventilador: string; public _disponibilidad: string;
  

  constructor(
    private habitacionService: HabitacionService,
    private reservaService: ReservaService,
    private modalService: NgbModal,
    //agregando del "EDITAR"
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.habitacionService.get().subscribe(result => {
      this.habitaciones = result;
    });
  }

  delete(identificacion: string) {
    this.habitacionService.delete(identificacion).subscribe(p => {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.message = 'Habitacion Eliminada!!! :)';
    });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm', centered: true });
  }

  // Desde aquí comienza todo lo correspondiente al "EDITAR"

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'lg', scrollable: true, centered: true });
  }

  consultaId(identificacion: string){
    this.idn=identificacion;
    this.habitacionService.getId(identificacion).subscribe(p => {
      if (p != null) {
        this.PintarInput(p);
        this.buildForm();
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Habitacion Encontrada!!! :)';
      }
    });
  }

  private PintarInput(habitacion1: Habitacion) {
    this._tipo = habitacion1.tipo;
    this._precio=habitacion1.precio;
    this._descripcion=habitacion1.descripcion;
    this._aire=habitacion1.aire;
    this._ventilador=habitacion1.ventilador;
    
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      idHabitacion: this.idn,
      tipo: [this._tipo, Validators.required],
      precio: [this._precio, Validators.required],
      descripcion: [this._descripcion, Validators.required],
      aire: [this._aire, Validators.required],
      ventilador:[this._ventilador, Validators.required],
      disponibilidad:"si"
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.updateHabitacion();
  }

  updateHabitacion(){
    this.habitacion = this.formGroup.value;
    this.habitacionService.put(this.habitacion).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Habitacion Modificada!!! :)';
        this.habitacion = p;
      }
    });
  }

  

  //prueba fecha
  asignarfecha() {
    var toma = new Date();
    this.pdia = toma.getDate().toString();
    this.pmes = (toma.getMonth() + 1).toString();
    this.paño = toma.getFullYear().toString();
    this.fechaprueba = this.pdia + "/" + this.pmes + "/" + this.paño;
  }

  traerHabitaciones() {
    this.habitacionService.get().subscribe(result => {
      this.habitaciones = result;

    });

  }

  traerReservas() {
    this.reservaService.get().subscribe(result => {
      this.reservas = result;
    });
  }

  comprobadorfechasAnt() {
    this.reservaService.get().subscribe(result => {
      this.reservas = result;
      this.reservas.forEach(item => {
        this.habitacionService.get().subscribe(result => {
          this.habitaciones = result;
          this.habitaciones.forEach(hab => {    
            var hoy = new Date();
            var fechaI = new Date(item.fechaInicio);
            var fechaF = new Date(item.fechaFin);
            if (hoy > fechaI && hoy < fechaF && hab.idHabitacion == item.idHabitacion) {
              alert("entro aqui 1");
              this.retornarHabitacion = new Habitacion();
              this.retornarHabitacion.idHabitacion = hab.idHabitacion;
              this.retornarHabitacion.descripcion = hab.descripcion;
              this.retornarHabitacion.aire = hab.aire;
              this.retornarHabitacion.ventilador = hab.ventilador;
              this.retornarHabitacion.tipo = hab.tipo;
              this.retornarHabitacion.precio = hab.precio;
              this.retornarHabitacion.disponibilidad = "no";
              this.habitacionService.put(this.retornarHabitacion).subscribe(p => {
                if (p != null) {
                  this.habitacion = p;
                }
              });
            }
          });
        });
      });
    });
  }

  comprobadorequisde(){
    this.habitacionService.get().subscribe(result => {
      this.habitaciones = result;
      this.habitaciones.forEach(hab =>{
        this.reservaService.get().subscribe(result => {
          this.reservas = result;
          this.reservas.forEach(item =>{            
            var hoy = new Date();
            var fechaI = new Date(item.fechaInicio);
            var fechaF = new Date(item.fechaFin);
            if(Object.keys(this.reservas).length == 0){
              this.contador=0;
              alert("entro aqui"+this.contador);
            }else
            if (hoy > fechaI && hoy < fechaF && hab.idHabitacion == item.idHabitacion) {
              this.contador=this.contador+1;
              alert("entro aqui"+this.contador);
            }
            if(this.contador==0){
              this.retornarHabitacion = new Habitacion();
              this.retornarHabitacion.idHabitacion = hab.idHabitacion;
              this.retornarHabitacion.descripcion = hab.descripcion;
              this.retornarHabitacion.aire = hab.aire;
              this.retornarHabitacion.ventilador = hab.ventilador;
              this.retornarHabitacion.tipo = hab.tipo;
              this.retornarHabitacion.precio = hab.precio;
              this.retornarHabitacion.disponibilidad = "Si";
              this.habitacionService.put(this.retornarHabitacion).subscribe(p => {
                if (p != null) {
                  this.habitacion = p;
                }
              });
            }else{
              alert("entro aqui"+this.contador);
              this.retornarHabitacion = new Habitacion();
              this.retornarHabitacion.idHabitacion = hab.idHabitacion;
              this.retornarHabitacion.descripcion = hab.descripcion;
              this.retornarHabitacion.aire = hab.aire;
              this.retornarHabitacion.ventilador = hab.ventilador;
              this.retornarHabitacion.tipo = hab.tipo;
              this.retornarHabitacion.precio = hab.precio;
              this.retornarHabitacion.disponibilidad = "No";
              this.habitacionService.put(this.retornarHabitacion).subscribe(p => {
                if (p != null) {
                  this.habitacion = p;
                }
              });
            }
          });
        });
      });
    });
  }

  get control() { return this.formGroup.controls; }

}
