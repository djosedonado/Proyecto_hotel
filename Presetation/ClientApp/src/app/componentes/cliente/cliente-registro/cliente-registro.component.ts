import { Component, OnInit } from '@angular/core';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {

  formGroup: FormGroup;
  cliente: Cliente;
  user:Users;
  constructor(
    private clienteService: ClienteService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
  }
 

  private buildForm() {
    this.cliente = new Cliente();
    this.formGroup = this.formBuilder.group({
      identificacion: [this.cliente.identificacion, Validators.required],
      nombre: [this.cliente.nombre, Validators.required],
      edad: [this.cliente.edad, Validators.required],
      sexo: [this.cliente.sexo, Validators.required],
      direccion: [this.cliente.direccion, Validators.required],
      celular: [this.cliente.celular, Validators.required],
      correo: [this.cliente.correo, Validators.required],
      usuario: [this.cliente.usuario, Validators.required],
      password: [this.cliente.password, Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.addUser();
    this.addCliente();
  }

  addUser(){    
    this.cliente = this.formGroup.value;
    this.user = new Users();
    this.user.userName = this.cliente.usuario;
    this.user.password = this.cliente.password;
    this.user.tipoUsuario = 'Cliente';
    this.usersService.post(this.user).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Rol Cliente creado!!! :-)';
        this.user = p;
      }
    });

    }

  addCliente() {
    this.cliente = this.formGroup.value;
    this.clienteService.post(this.cliente).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Cliente creado!!! :-)';
        this.cliente = p;
      }
    });

  }

  get control() { return this.formGroup.controls; }

}
