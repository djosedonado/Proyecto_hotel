import { Component, OnInit } from '@angular/core';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto-registro',
  templateUrl: './producto-registro.component.html',
  styleUrls: ['./producto-registro.component.css']
})
export class ProductoRegistroComponent implements OnInit {

  formGroup: FormGroup;
  producto:Producto;
  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

    ngOnInit(){
      this.buildForm();
    }
    private buildForm() {
      this.producto = new Producto();
      this.formGroup = this.formBuilder.group({
        idProducto: [this.producto.idProducto, Validators.required],
        nombre: [this.producto.nombre, Validators.required],
        tipo: [this.producto.tipo, Validators.required],
        precio: [this.producto.precio, Validators.required],
        cantidad: [this.producto.cantidad, Validators.required]
      });
    }
  
    onSubmit() {
      if (this.formGroup.invalid) {
        return;
      }
      this.add();
    }
  
    add() {
      this.producto = this.formGroup.value;
      this.productoService.post(this.producto).subscribe(p => {
        if (p != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado Operación";
          messageBox.componentInstance.message = 'producto creado!!! :D';
          this.producto = p;
        }
      });
  
    }
  
    get control() { return this.formGroup.controls; }

}

