import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-edita',
  templateUrl: './cliente-edita.component.html',
  styleUrls: ['./cliente-edita.component.css']
})
  export class ClienteEditaComponent implements OnInit {

    formGroup: FormGroup;
    cliente: Cliente;
    closeResult: string;
    
    idn: string; public _nombre: string; public _edad: number; public _sexo: string; public _direccion: string;
    public _celular: string; public _correo: string; public _usuario: string; public _password: string;
    constructor(
      private clienteService: ClienteService,
      private _route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private modalService: NgbModal) { }
  
    ngOnInit() {
      this.idn = this._route.snapshot.params.id;
      this.clienteService.getId(this.idn).subscribe(p => {
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
  
