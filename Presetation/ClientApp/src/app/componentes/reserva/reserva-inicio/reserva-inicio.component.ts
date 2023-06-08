import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Habitacion } from 'src/app/models/habitacion';
import { Reserva } from 'src/app/models/reserva';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';

import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';
import { Cliente } from 'src/app/models/cliente';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reserva-inicio',
  templateUrl: './reserva-inicio.component.html',
  styleUrls: ['./reserva-inicio.component.css']
})
export class ReservaInicioComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;

  modal: boolean = false;
  prueba1:Date;
  prueba2:Date;
  baderilla:number=0;
  totalPagar:number=0;
  validadorFechasIguales:number = 0;
  clienteR:boolean=false;
  cumpleCondicion:number=0;
  idn: string;
  _fechaInicio:Date;
  _fechaFin:Date;
  _idHabitacion:string;

  //esto es de la gestion de reserva
  formGroup: FormGroup;
  reserva:Reserva;
  habitaciones:Habitacion[];
  habitacionesDisponibles:Habitacion[] = [];
  habitacion:Habitacion;
  reservas:Reserva[];
  equisde:Cliente;
    //
      eventsInicio: string[] = [];
      eventsFin: string[] = [];
    //

  //esto es de la gestion de reserva

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'King'},
    {value: 'pizza-1', viewValue: 'KingDoble'},
    {value: 'tacos-2', viewValue: 'KingKing'}
  ];
  factura: Factura;

  constructor(
    private location: Location,
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private habitacionService: HabitacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.traerHabitaciones();
    this.traerReservas();
    this.esconderDiv();
  }

  RedirigirInicoi(){
    this.router.navigate(['inicioHotel']);
  }

  traerHabitaciones(){
    this.habitacionService.get().subscribe(result => {
      this.habitaciones = result;
    });
  }
  //todo esta bien

  traerReservas(){
    this.reservaService.get().subscribe(result =>{
      this.reservas = result;
    });
  }

  change(){
    if(this.modal)
      this.modal=false;
    else
      this.modal=true;
  }

  goBack(){
    // window.history.back();
    this.location.back();
  }

  //gestionando reservas
  addEventInicio(type: string, event: MatDatepickerInputEvent<Date>) {
    this.prueba1 = event.value;
    this.eventsInicio.push(`${type}: ${event.value}`);
  }

  addEventFin(type: string, event: MatDatepickerInputEvent<Date>) {
    this.eventsFin.push(`${type}: ${event.value}`);
    this.prueba2 = event.value;
  }

  comprobadorfechas(){
    this.traerReservas();    
    this.traerHabitaciones();
    this.habitaciones.forEach(hab=>{
        this.reservas.forEach(res => {  
          var toma1 =new Date(this.prueba1);
          var toma2 =new Date(this.prueba2);
          var fechaI = new Date(res.fechaInicio);
          var fechaF = new Date(res.fechaFin);        
          if(toma1 > fechaI && toma1 < fechaF && hab.idHabitacion==res.idHabitacion ||
             toma2 > fechaI && toma2 < fechaF && hab.idHabitacion==res.idHabitacion ||
             toma1 < fechaI && toma2 > fechaF && hab.idHabitacion==res.idHabitacion){
                this.cumpleCondicion=this.cumpleCondicion+1;            
            }
          });
      if(this.cumpleCondicion==0){
        var probador = 0;
        this.habitacionesDisponibles.forEach(habdis=>{
          if(habdis.idHabitacion==hab.idHabitacion){
            probador = probador+1;
          }
        });
        if(probador==0){ 
          this.habitacionesDisponibles.push(hab);
        }             
       }else{
          this.cumpleCondicion=0;
        }
    });
    if(this.habitacionesDisponibles.length<=0){
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "¡Vaya!...";
      messageBox.componentInstance.message = 'No hay habitaciones disponibles en esta fecha. '+
      '<br> Intente consultar con otro intervalo nuevamente :D.';
    }
    this.calcularDias();
  }
  
  calcularDias(){
    this.habitacionesDisponibles.forEach(hab=>{      
      var dfi = new Date(this.prueba1).getTime();
      var dff = new Date(this.prueba2).getTime();
      var diff = (dff - dfi);
      this.totalPagar = (diff/(1000*60*60*24))+1;
    });
  }
  
  fechaCorrecta(){ 
    var fechaActual = new Date();
    var toma1 =new Date(this.prueba1);
    var toma2 =new Date(this.prueba2);
    if(toma1>toma2){
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "¡Problemas!";
      messageBox.componentInstance.message = 'La fecha final debe ser mayor a la fecha inicial';
    }else if(fechaActual>toma1||fechaActual>toma2){
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "¡Problemas!";
      messageBox.componentInstance.message = 'No se puede reservar en fechas anterioreas a la actual :c';      
    }else{
      this.comprobadorfechas();
    }
  }

  pintarInput(idhab:string){
    this._fechaFin=this.prueba2;
    this._fechaInicio=this.prueba1;
    this._idHabitacion=idhab;
    this.buildForm();
  }

  //Esto es del modal content del registro de reserva
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'lg', scrollable: true, centered: true });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' ,centered: true });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    var unu = this.validadorFechas();
      if(unu>=1){
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Ya hay una reserva en esta fecha :c';        
      }else{
        this.add();
      }
  }

  validadorFechas(): number {
    this.traerReservas();
    this.reserva = this.formGroup.value;
    var idhab = this.reserva.idHabitacion;

    this.reservas.forEach(item => {
        
      var toma1 =new Date(this.prueba1);
      var toma2 =new Date(this.prueba2);
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

  //todo lo del formGroup

  private buildForm() {
    this.reserva = new Reserva();
    this.formGroup = this.formBuilder.group({
      fechaInicio:this.prueba1,
      fechaFin:this.prueba2,
      idHabitacion: this._idHabitacion,
      cantidadPersonas: [this.reserva.cantidadPersonas, Validators.required],
      idCliente: [this.reserva.idCliente, Validators.required],
    });
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

  //cosas del apartado de cliente
  tomarValor(texto:string){
    this.idn=texto;
    if(texto==''){
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.message = 'Cliente No Encontrado!!! :)'
    }else{
      this.clienteService.getId(this.idn).subscribe(p => {
        if (p != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'Cliente Encontrado!!! :)';
           this.esconderDiv();
        }else{
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'Cliente No Encontrado!!! :)';
          this.clienteR=true;
        }
      });
    }
  }

  esconderDiv(){    
    this.clienteR=false;    
  }

//prueba pdf servivle alv que hermosura alv alv alv uwuwu
  public downloadPDF():void {

    const options ={
      
      margin:3,
      image:        { type:'png'},
      html2canvas:  { scale: 1},
      jsPDF:        { format: 'b6', orientation: 'landscape' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    }

    const element:Element=document.getElementById('htmlData');
    html2pdf()
          .from(element)
          .set(options)
          .save('Factura')

  }
  //aqui finaliza la prueba para generar pdfs

}
