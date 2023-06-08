import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from 'src/app/models/reserva';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Habitacion } from 'src/app/models/habitacion';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/models/factura';

@Component({
  selector: 'app-reserva-registro',
  templateUrl: './reserva-registro.component.html',
  styleUrls: ['./reserva-registro.component.css']
})
export class ReservaRegistroComponent implements OnInit {

  //prueba 
  fechaprueba:string;
  pdia:string;
  pmes:string;
  paño:string;
  baderilla:number = 0;
  validadorFechasIguales:number = 0;
  //finprueba

  formGroup: FormGroup;
  factura:Factura;
  reserva:Reserva;
  habitaciones:Habitacion[];
  habitacion:Habitacion;
  habitacionConsultada:Habitacion;
  reservas:Reserva[];
  constructor(
    private reservaService: ReservaService,
    private habitacionService: HabitacionService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

    ngOnInit(){      
      this.asignarfecha();
      this.traerReservas();
      this.traerHabitaciones();
      this.buildForm();
    }

    traerHabitaciones(){
      this.habitacionService.get().subscribe(result => {
        this.habitaciones = result;});
    }

    traerReservas(){
      this.reservaService.get().subscribe(result => {
        this.reservas = result;
      });
    }

    private buildForm() {
      this.reserva = new Reserva();
      this.formGroup = this.formBuilder.group({
        fechaInicio: [this.reserva.fechaInicio, Validators.required],
        fechaFin: [this.reserva.fechaFin, Validators.required],
        cantidadPersonas: [this.reserva.cantidadPersonas, Validators.required],
        idCliente: [this.reserva.idCliente, Validators.required],
        idHabitacion: [this.reserva.idHabitacion, Validators.required],
      });
    }
  
    onSubmit() {
      if (this.formGroup.invalid) {
        return;
      }
      var unu = this.comprobadorfechas();
      var uwu = this.fechaCorrecta();
      if(unu>=1){
        const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'Ya hay una reserva en esta fecha :c';        
      }else if(uwu>=1){                
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'la fecha final debe ser mayor a la fecha inicial';
      }else{
        this.add();
      }
    }

    add() {
      this.reserva = this.formGroup.value;
      this.reservaService.post(this.reserva).subscribe(p => {
        if (p != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'Reseerva creada!!! :D';
          this.reserva = p;
        }
      });
      this.traerReservas();
    }
  
    public getError(controlName: string): string {
      let error = '';
      const control = this.formGroup.get(controlName);
      if (control.touched && control.errors != null) {
        error = JSON.stringify(control.errors);
      }
      return error;
    }
  
    public getErrorV(controlName: string): ValidationErrors {
      return this.formGroup.get(controlName).errors;
    }
    get control() { return this.formGroup.controls; }

    //prueba fecha
    asignarfecha(){
      var toma = new Date();
      this.pdia = toma.getDate().toString();
      this.pmes = (toma.getMonth()+1).toString();
      this.paño = toma.getFullYear().toString();
      this.fechaprueba = this.paño + "/" + this.pmes + "/" + this.pdia;
    }

    comprobadorfechas(): number {
      this.traerReservas();
      this.reserva = this.formGroup.value;
      var idhab = this.reserva.idHabitacion;

      this.reservas.forEach(item => {
          
        var toma1 =new Date(this.reserva.fechaInicio);
        var toma2 =new Date(this.reserva.fechaFin);
        var fechaI = new Date(item.fechaInicio);
        var fechaF = new Date(item.fechaFin);        
        if(toma1 > fechaI && toma1 < fechaF && idhab==item.idHabitacion ||
           toma2 > fechaI && toma2 < fechaF && idhab==item.idHabitacion){
          return this.baderilla=this.baderilla+1;
          }else{
            return this.baderilla=this.baderilla+0;
          }
       });
       return this.baderilla;    
    }

    fechaCorrecta():number{
      this.reserva=this.formGroup.value;
      var toma1 =new Date(this.reserva.fechaInicio);
      var toma2 =new Date(this.reserva.fechaFin);

      if(toma1>toma2){
        this.validadorFechasIguales=this.validadorFechasIguales+1;
      }
      return this.validadorFechasIguales;
    }

}