import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recepcionista } from 'src/app/models/recepcionista';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';

@Component({
  selector: 'app-recepcionista-edita',
  templateUrl: './recepcionista-edita.component.html',
  styleUrls: ['./recepcionista-edita.component.css']
})
export class RecepcionistaEditaComponent implements OnInit {

  formGroup: FormGroup;
  recepcionista:Recepcionista;
  searchText:string;
  idn: string; public _nombre:string;public _edad: number;public _sexo: string; public _direccion:string;
  public _celular:string; public _correo:string; public _usuario:string; public _password:string;
  constructor(
    private recepcionistaService: RecepcionistaService,
    private _route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(){
    this.idn = this._route.snapshot.params.id;
    this.recepcionistaService.getId(this.idn).subscribe(p => {
      if (p != null) {        
        this.PintarInput(p);
        this.buildForm();
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Recepcionista Encontrada!!! :)';
      }
    });
  }
  private PintarInput(recepcionista1: Recepcionista){
    this._nombre = recepcionista1.nombre;
    this._edad = recepcionista1.edad;
    this._sexo = recepcionista1.sexo;
    this._direccion = recepcionista1.direccion;
    this._celular = recepcionista1.celular;
    this._correo = recepcionista1.correo;
    this._usuario = recepcionista1.usuario;
    this._password = recepcionista1.password;
}


private buildForm() {
this.formGroup = this.formBuilder.group({
  identificacion: this.idn,
  nombre: [this._nombre, Validators.required],
  edad: [this._edad, Validators.required],
  sexo: [this._sexo, Validators.required],
  direccion: [this._direccion, Validators.required],
  celular: [this._celular, Validators.required],
  correo: [this._correo, Validators.required],
  usuario: [this._usuario, Validators.required],
  password: [this._password, Validators.required],
});
}

onSubmit() {
if (this.formGroup.invalid) {
  return;
}
this.add();
}

openSm(content) {
  this.modalService.open(content, { size: 'sm' ,centered: true });
}

add() {
this.recepcionista = this.formGroup.value;
this.recepcionistaService.put(this.recepcionista).subscribe(p => {
  if (p != null) {
    const messageBox = this.modalService.open(AlertModalComponent)
    messageBox.componentInstance.title = "Resultado Operación";
    messageBox.componentInstance.message = 'Recepcionista Modificado!!! :)';
    this.recepcionista = p;
  }
});

}

get control() { return this.formGroup.controls; }

}
