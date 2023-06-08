import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Habitacion } from 'src/app/models/habitacion';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-habitacion-registro',
  templateUrl: './habitacion-registro.component.html',
  styleUrls: ['./habitacion-registro.component.css']
})
export class HabitacionRegistroComponent implements OnInit {

  formGroup: FormGroup;
  habitacion: Habitacion;
  _ventilador:boolean;_aire:boolean;
  constructor(
    private habitacionService: HabitacionService, 
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

    ngOnInit() {
      this.buildForm();
    }
    
    private buildForm() {
      this.habitacion = new Habitacion();
      this.formGroup = this.formBuilder.group({
        idHabitacion: [this.habitacion.idHabitacion, Validators.required],
        tipo: [this.habitacion.tipo, Validators.required],
        precio: [this.habitacion.precio, Validators.required],
        descripcion: [this.habitacion.descripcion, Validators.required],
        aire: [this.habitacion.aire, Validators.required],
        ventilador:[this.habitacion.ventilador, Validators.required],
        disponibilidad:"si",
      });
    }
  
    onSubmit() {
      if (this.formGroup.invalid) {
        return;
      }
      this.add();
    }
  
    add() {
      this.habitacion = this.formGroup.value;
      this.habitacionService.post(this.habitacion).subscribe(p => {
        if (p != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'habitacion creado!!! :-)';
          this.habitacion = p;
        }
      });
  
    }
  
    get control() { return this.formGroup.controls; }

}
