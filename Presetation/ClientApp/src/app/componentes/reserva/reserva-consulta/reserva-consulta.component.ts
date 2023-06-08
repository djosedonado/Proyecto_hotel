import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { ReservaService } from 'src/app/services/reserva.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { Habitacion } from 'src/app/models/habitacion';
import { Factura } from 'src/app/models/factura';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-reserva-consulta',
  templateUrl: './reserva-consulta.component.html',
  styleUrls: ['./reserva-consulta.component.css']
})
export class ReservaConsultaComponent implements OnInit {

  reservas:Reserva[];
  habitaciones:Habitacion[];
  facturas:Factura[];
  reserva:Reserva;
  factura:Factura;
  searchText:string;
  closeResult: string;

  //esto pertenece al editar
  baderilla:number = 0;
  validadorFechasIguales:number = 0;
  idn: number;
  _fechaInicio:Date;
  _fechaFin:Date; 
  _cantidadPersonas:number; 
  _idCliente:string; 
  _idHabitacion:string;
  formGroup: FormGroup;

  constructor(
    private reservaService: ReservaService,
    private habitacionService: HabitacionService,
    private facturaService: FacturaService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(){
    this.traerReservas();
    this.traerHabitaciones();
    this.buildForm();
  }

  delete(identificacion: number) {
    this.reservaService.delete(identificacion).subscribe(p => {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.message = 'Reserva Eliminada!!! :)';
    });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' ,centered: true });
  }

  // Desde aquí comienza todo lo correspondiente al "EDITAR"

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'lg', scrollable: true, centered: true });
  }

  consultaId(identificacion: number){
    this.idn=identificacion;
    this.reservaService.getId(this.idn).subscribe(p => {
      if (p != null) {
        this.PintarInput(p);
        this.buildForm();
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Reserva Encontrada!!! :)';
      }
    });
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

  private PintarInput(reserva1: Reserva) {
    this._fechaInicio= reserva1.fechaInicio;
    this._fechaFin = reserva1.fechaFin;
    this._cantidadPersonas = reserva1.cantidadPersonas;
    this._idHabitacion = reserva1.idHabitacion;
    this._idCliente = reserva1.idCliente;
  }


  private buildForm() {
    this.reserva = new Reserva();
    this.formGroup = this.formBuilder.group({
      idReserva: this.idn,
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
      this.updateReserva();
    }
  }
  
  updateReserva() {
    this.reserva = this.formGroup.value;
    this.reservaService.put(this.reserva).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Reserva Modificada!!! :)';
        this.reserva = p;
      }
    });
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
  get f() { return this.formGroup.controls; }

  get control() { return this.formGroup.controls; }

  //fechas, cosas de fechas

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

  //generador de facturas, prueba

  GenerarFactura(_idReservaVenidera:number){
    this.factura = new Factura();
    var uwu=""+_idReservaVenidera;
    var contador = 0;

    this.facturaService.get().subscribe(result=>{
      result.forEach(item=>{
        if(item.idReserva==uwu){
          contador=contador+1;
        }
      });

      if(contador!=0){
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "¡Vaya!";
        messageBox.componentInstance.message = 'No se puede generar la factura: '+uwu+' debido a que esta reserva ya está facturada.';
      }else{
        this.reservaService.getId(_idReservaVenidera).subscribe(p=>{
          if (p != null) { 
            alert('id reserva'+ p.idReserva)
            this.habitacionService.getId(p.idHabitacion).subscribe(q=>{
              if (q != null) {
                var dfi = new Date(p.fechaInicio).getTime();
                var dff = new Date(p.fechaFin).getTime();
                var diff = (dff - dfi);
                var totalPagar = (diff/(1000*60*60*24))+1;
    
                this.factura.idReserva = ""+_idReservaVenidera;
                alert('id reserva'+ this.factura.idReserva)
                this.factura.total = q.precio * totalPagar;
    
                this.facturaService.post(this.factura).subscribe(p=>{
                  if (p != null) {
                    const messageBox = this.modalService.open(AlertModalComponent)
                    messageBox.componentInstance.title = "Operación realizada con éxito";
                    messageBox.componentInstance.message = 'Factura creada!!! :D';
                    this.factura = p;      
                  }
                });
              }
            });       
          }
        });
      }
    });
  }
}
