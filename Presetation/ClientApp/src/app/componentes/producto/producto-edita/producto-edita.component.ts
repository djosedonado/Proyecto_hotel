import { Component, OnInit } from '@angular/core';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto-edita',
  templateUrl: './producto-edita.component.html',
  styleUrls: ['./producto-edita.component.css']
})
export class ProductoEditaComponent implements OnInit {

  formGroup: FormGroup;
  producto: Producto;
  searchText: string;
  idn: string; public _nombre: string;public _tipo: string; public _precio: number; 
  constructor(
    private productoService: ProductoService,
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.idn = this._route.snapshot.params.id;
    this.productoService.getId(this.idn).subscribe(p => {
      if (p != null) {
        this.PintarInput(p);
        this.buildForm();
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Producto Encontrado!!! :)';
      }
    });
  }

  private PintarInput(producto1: Producto) {
    this._nombre= producto1.nombre;
    this._tipo = producto1.tipo;
    this._precio = producto1.precio;
  }
  
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      idProducto: this.idn,
      nombre: [this._nombre, Validators.required],
      tipo: [this._tipo, Validators.required],
      precio: [this._precio, Validators.required],
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
    this.producto = this.formGroup.value;
    this.productoService.put(this.producto).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Producto Modificado!!! :)';
        this.producto = p;
      }
    });
  }

  get control() { return this.formGroup.controls; }


}
