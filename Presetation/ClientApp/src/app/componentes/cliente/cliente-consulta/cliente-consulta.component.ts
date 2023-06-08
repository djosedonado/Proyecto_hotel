import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent implements OnInit {

  //Esto es de Consulta
  clientes:Cliente[];
  cliente:Cliente;
  searchText: string;
  closeResult: string;

  // Cosas agregadas del "EDITAR"
  formGroup: FormGroup;
  users:Users;

  idn: string; public _nombre: string; public _edad: number; public _sexo: string; public _direccion: string;
  public _celular: string; public _correo: string; public _usuario: string; public _password: string;

  constructor(
    private clienteService: ClienteService,
    private usersService: UsersService,
    private modalService: NgbModal,
    //agregando del "EDITAR"
    private formBuilder: FormBuilder) { } 

  ngOnInit() {
    this.clienteService.get().subscribe(result => {
      this.clientes = result;
    });
  }

  delete(identificacion: string) {
    this.clienteService.delete(identificacion).subscribe(p => {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.message = 'Cliente Eliminado!!! :)';
    });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' , centered: true });
  }
  
  // Desde aquí comienza todo lo correspondiente al "EDITAR"

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'lg', scrollable: true, centered: true });
  }

  consultaId(identificacion: string){
    this.idn=identificacion;
    this.clienteService.getId(identificacion).subscribe(p => {
      if (p != null) {
        this.PintarInput(p);
        this.buildForm();
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Cliente Encontrado!!! :)';
      }
    });
  }

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
    this.updateUsers();
    this.updateCliente();
  }

  updateUsers(){
    this.cliente = this.formGroup.value;
    this.users = new Users();
    this.users.userName = this.cliente.usuario;
    this.users.password = this.cliente.password;
    this.users.tipoUsuario = 'Cliente';
    this.usersService.put(this.users).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Usuario Modificado!!! :)';
        this.users = p;
      }
    });
  }
  
  updateCliente() {
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

  get control() { return this.formGroup.controls; }

}
