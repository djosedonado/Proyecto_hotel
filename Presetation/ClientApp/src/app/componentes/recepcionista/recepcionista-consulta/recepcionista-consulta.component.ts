import { Component, OnInit } from '@angular/core';
import { Recepcionista } from 'src/app/models/recepcionista';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-recepcionista-consulta',
  templateUrl: './recepcionista-consulta.component.html',
  styleUrls: ['./recepcionista-consulta.component.css']
})
export class RecepcionistaConsultaComponent implements OnInit {

  //Esto es de Consulta
  recepcionistas:Recepcionista[];
  recepcionista:Recepcionista;
  searchText:string;
  closeResult: string;
  

  // Cosas agregadas del "EDITAR"
  formGroup: FormGroup;
  users:Users;

  idn: string; public _nombre: string; public _edad: number; public _sexo: string; public _direccion: string;
  public _celular: string; public _correo: string; public _usuario: string; public _password: string;

  constructor(
    private recepcionistaService: RecepcionistaService,
    private usersService: UsersService,
    private modalService: NgbModal,
    //agregando del "EDITAR"
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.recepcionistaService.get().subscribe(result => {
      this.recepcionistas = result;
    });
  }

  delete(identificacion: string) {
    this.recepcionistaService.delete(identificacion).subscribe(p => {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "Resultado Operación";
      messageBox.componentInstance.message = 'Recepcionista Eliminada!!! :)';
    });
  }

  openSm(content) { 
    this.modalService.open(content, { size: 'sm' ,centered: true });
  }

  // Desde aquí comienza todo lo correspondiente al "EDITAR"

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { size: 'lg', scrollable: true, centered: true });
  }

  consultaId(identificacion: string){
    this.idn=identificacion;
    this.recepcionistaService.getId(identificacion).subscribe(p => {
      if (p != null) {
        this.PintarInput(p);
        this.buildForm();
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Recepcionista Encontrado/a!!! :)';
      }
    });
  }

  private PintarInput(recepcionista1: Recepcionista) {
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
    this.updateUsers();
    this.updateRecepcionista();
  }

  updateUsers(){
    this.recepcionista = this.formGroup.value;
    this.users = new Users();
    this.users.userName = this.recepcionista.usuario;
    this.users.password = this.recepcionista.password;
    this.users.tipoUsuario = 'recepcionista';
    this.usersService.put(this.users).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Usuario Modificado!!! :)';
        this.users = p;
      }
    });
  }
  
  updateRecepcionista() {
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
