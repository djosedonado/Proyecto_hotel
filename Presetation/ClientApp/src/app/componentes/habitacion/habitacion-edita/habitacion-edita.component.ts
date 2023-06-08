import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habitacion } from 'src/app/models/habitacion';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habitacion-edita',
  templateUrl: './habitacion-edita.component.html',
  styleUrls: ['./habitacion-edita.component.css']
})
export class HabitacionEditaComponent implements OnInit {

  formGroup: FormGroup;
  habitacion: Habitacion;
  closeResult: string;
  idn: string; public _tipo: string; public _precio: number; public _descripcion: string; public _aire: string;
    public _ventilador: string; public _disponibilidad: string;
  constructor(
    private habitacionService: HabitacionService, 
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

    ngOnInit() {
      this.idn = this._route.snapshot.params.id;
      this.habitacionService.getId(this.idn).subscribe(p => {
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
      this._precio = habitacion1.precio;
      this._descripcion = habitacion1.descripcion;
      this._aire = habitacion1.aire;
      this._ventilador = habitacion1.ventilador;
      this._disponibilidad = habitacion1.disponibilidad;
    }
    
    private buildForm() {
      this.habitacion = new Habitacion();
      this.formGroup = this.formBuilder.group({
        idHabitacion: this.idn,
        tipo: [this._tipo , Validators.required],
        precio: [this._precio, Validators.required],
        descripcion: [this._descripcion, Validators.required],
        aire: [this._aire, Validators.required],
        ventilador:[this._ventilador, Validators.required],
        disponibilidad:this._disponibilidad,
      });
    }

    openSm(content) {
      this.modalService.open(content, { size: 'sm' ,centered: true });
    }
  
    onSubmit() {
      if (this.formGroup.invalid) {
        return;
      }
      this.add();
    }
  
    add() {
      this.habitacion = this.formGroup.value;
      this.habitacionService.put(this.habitacion).subscribe(p => {
        if (p != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'Habitacion Modificada!!! :-)';
          this.habitacion = p;
        }
      });
    }
  
    get control() { return this.formGroup.controls; }

}
