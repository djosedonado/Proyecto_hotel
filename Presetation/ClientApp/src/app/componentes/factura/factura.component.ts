import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Factura } from 'src/app/models/factura';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import * as html2pdf from 'html2pdf.js';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { Cliente } from 'src/app/models/cliente';
import { Reserva } from 'src/app/models/reserva';
import { Habitacion } from 'src/app/models/habitacion';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  factura:Factura;
  facturas:Factura[];
  searchText:any;
  totalFacturas:number=0;

  //inicio variables para mapear factura

  //factura
  _idFactura:number;
  _idReserva:string;
  _total:number;
  //reserva
  _fechaI:string;
  _fechaF:string;
  _dias:number;
  //cliente
  _idCliente:string;
  _nombre:string;
  //habitacion
  _idHabitacion:string;
  _tipo:string;
  _precio:number;

  //fin variables para mapear factura

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private reservaService: ReservaService,
    private habitacionService: HabitacionService,
    private modalService: NgbModal) { }

  ngOnInit(){
    this.traerFacturas();
  }

  traerFacturas(){
    this.facturaService.get().subscribe(result => {
      this.facturas = result;
      this.facturas.forEach(fact=>{
        this.totalFacturas=this.totalFacturas+fact.total;
      });
    });
  }

  consultarId(identificacion:number){
    this.facturaService.getId(identificacion).subscribe(p => {
      if (p != null) {
        var idres: number=+p.idReserva; 
        this.reservaService.getId(idres).subscribe(q=>{
          if (q != null) {
            this.habitacionService.getId(q.idHabitacion).subscribe(r=>{
              if (r != null) {
                this.clienteService.getId(q.idCliente).subscribe(s=>{
                  if (s != null) {
                    this.mapearFactura(p,s,q,r);
                    const messageBox = this.modalService.open(AlertModalComponent)
                    messageBox.componentInstance.title = "¡Perfecto!";
                    messageBox.componentInstance.message = 'Factura encontrada!!! :3';
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  mapearFactura(_Factura:Factura, _cliente:Cliente, _Reserva:Reserva, _habitacion:Habitacion){
    this._idFactura= _Factura.idFactura;
    this._idReserva= _Factura.idReserva;
    this._total= _Factura.total;
    this._idCliente=_cliente.identificacion;
    this._nombre=_cliente.nombre;
    this._idHabitacion=_habitacion.idHabitacion;
    this._tipo=_habitacion.tipo;
    this._precio=_habitacion.precio;
    this._fechaI= this.asignarfecha(_Reserva.fechaInicio);
    this._fechaF= this.asignarfecha(_Reserva.fechaFin);
    this._dias=this.calcularDias(_Reserva.fechaInicio,_Reserva.fechaFin);
  }

  asignarfecha(fechaVenidera:Date):string{
    var toma = new Date(fechaVenidera);
    var pdia  
    var pmes
    var paño
    var fechaprueba
    pdia = toma.getDate().toString();
    pmes = (toma.getMonth()+1).toString();
    paño = toma.getFullYear().toString();
    return fechaprueba = paño + "/" + pmes + "/" + pdia;
  }

  calcularDias(_feci:Date, _fecf:Date):number{  
      var dfi = new Date(_feci).getTime();
      var dff = new Date(_fecf).getTime();
      var diff = (dff - dfi);
      var totaldias
      return totaldias = (diff/(1000*60*60*24))+1;
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'lg', scrollable: true, centered: true });
  }

  //prueba pdf servivle alv que hermosura alv alv alv uwuwu
  public downloadPDF(_idFacturaRecibida:number):void {

    const options ={
      
      margin:1,
      image:        { type:'png'},
      html2canvas:  { scale: 1},
      jsPDF:        { format: 'a5', orientation: 'landscape' }
    }

    const element:Element=document.getElementById('htmlData');
    html2pdf()
          .from(element)
          .set(options)
          .save('Factura '+_idFacturaRecibida)

  }
  //aqui finaliza la prueba para generar pdfs

}
