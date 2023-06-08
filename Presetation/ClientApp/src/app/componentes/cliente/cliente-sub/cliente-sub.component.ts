import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cliente-sub',
  templateUrl: './cliente-sub.component.html',
  styleUrls: ['./cliente-sub.component.css']
})
export class ClienteSubComponent implements OnInit {

  sisepuede:string;
  formGroup: FormGroup;
  cliente:Cliente;
  user:Users;
  
  idn: string; public _nombre: string; public _edad: number; public _sexo: string; public _direccion: string;
    public _celular: string; public _correo: string; public _usuario: string; public _password: string;

  constructor(
    private authenticationService: AuthenticationService,
    private usersService:UsersService,
    private clienteService: ClienteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(){
    this.consultarUsuario();
  }

  //posible consulta de cc de usuario
  consultarUsuario(){
    var user = this.authenticationService.currentUserValue;
    this.clienteService.get().subscribe(result=>{
      result.forEach(client => {
        if(user.userName==client.usuario){
          this.sisepuede=client.identificacion;
          this.PintarInput(client);
          this.buildForm();
        }
      });
    });
  }
  //fin posible consulta de cc de usuario

  private PintarInput(cliente1: Cliente) {
    this._nombre = cliente1.nombre;
    this._edad = cliente1.edad;
    this._sexo = cliente1.sexo;
    this._direccion = cliente1.direccion;
    this._celular = cliente1.celular;
    this._correo = cliente1.correo;
    this._usuario = cliente1.usuario;
    this._password = cliente1.password;
  }


  private buildForm() {
    this.formGroup = this.formBuilder.group({
      identificacion: this.sisepuede,
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

  openSm(content) {
    this.modalService.open(content, { size: 'sm' ,centered: true });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.addUser();
    this.addCliente();
  }
  
  addCliente() {
    this.cliente = this.formGroup.value;
    this.clienteService.put(this.cliente).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Cliente Modificado!!! :)';
        this.cliente = p;
      }
    });

  }
  
  addUser(){    
    this.cliente = this.formGroup.value;
    this.user = new Users();
    this.user.userName = this.cliente.usuario;
    this.user.password = this.cliente.password;
    this.user.tipoUsuario = 'Cliente';
    this.usersService.put(this.user).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Rol Modificado creado!!! :-)';
        this.user = p;
      }
    });

    }

  get control() { return this.formGroup.controls; }

}
