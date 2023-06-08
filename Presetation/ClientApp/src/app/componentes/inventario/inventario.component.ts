import { Component, OnInit } from '@angular/core';
import { Inventario } from 'src/app/models/inventario';
import { InventarioServiceService } from 'src/app/services/inventario-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  //Esto es de Consulta
  inventarios:Inventario[];
  inventario:Inventario;
  searchText: string;
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private inventarioService:InventarioServiceService
  ) { }

  ngOnInit(): void {
    this.inventarioService.get().subscribe(result => {
      this.inventarios = result;
    });
  }

}
