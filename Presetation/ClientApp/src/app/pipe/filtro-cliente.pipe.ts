import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../models/cliente';

@Pipe({
  name: 'filtroCliente'
})
export class FiltroClientePipe implements PipeTransform {

  transform(cliente: Cliente[], searchText: string): any {
    if (searchText == null) return cliente;
        return cliente.filter(p =>
        p.identificacion.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1 ||
        p.nombre.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1||
        p.sexo.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1||
        p.direccion.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1||
        p.correo.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1||
        p.celular.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1||
        p.usuario.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1);
    }

}
