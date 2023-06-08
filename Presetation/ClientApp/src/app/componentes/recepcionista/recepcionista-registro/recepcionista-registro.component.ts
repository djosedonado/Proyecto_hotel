import { Component, OnInit } from '@angular/core';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Recepcionista } from 'src/app/models/recepcionista';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-recepcionista-registro',
  templateUrl: './recepcionista-registro.component.html',
  styleUrls: ['./recepcionista-registro.component.css']
})
export class RecepcionistaRegistroComponent implements OnInit {

  formGroup: FormGroup;
  recepcionista:Recepcionista;
  user:Users;
  constructor(
    private recepcionistaService: RecepcionistaService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(){
    this.buildForm();
  }
  private buildForm() {
    this.recepcionista = new Recepcionista();
    this.formGroup = this.formBuilder.group({
      identificacion: [this.recepcionista.identificacion, Validators.required],
      nombre: [this.recepcionista.nombre, Validators.required],
      edad: [this.recepcionista.edad, Validators.required],
      sexo: [this.recepcionista.sexo, Validators.required],
      direccion: [this.recepcionista.direccion, Validators.required],
      celular: [this.recepcionista.celular, Validators.required],
      correo: [this.recepcionista.correo, Validators.required],
      usuario: [this.recepcionista.usuario, Validators.required],
      password: [this.recepcionista.password, Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.addUser();
    this.addRecepcionista();
  }

  addUser(){    
    this.recepcionista = this.formGroup.value;
    this.user = new Users();
    this.user.userName = this.recepcionista.usuario;
    this.user.password = this.recepcionista.password;
    this.user.tipoUsuario = 'Recepcionista';
    this.usersService.post(this.user).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Rol Recepcionista creado!!! :-)';
        this.user = p;
      }
    });

    }

  addRecepcionista() {
    this.recepcionista = this.formGroup.value;
    this.recepcionistaService.post(this.recepcionista).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Recepcionista creado!!! :D';
        this.recepcionista = p;
      }
    });

  }

  get control() { return this.formGroup.controls; }
}
