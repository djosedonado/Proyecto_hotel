import { Pipe, PipeTransform } from '@angular/core';
import { Recepcionista } from '../models/recepcionista';

@Pipe({
  name: 'filtroRecepcionista'
})
export class FiltroRecepcionistaPipe implements PipeTransform {

  transform(recepcionista: Recepcionista[], searchText: string): any {
    if (searchText == null) return recepcionista;
        return recepcionista.filter(p =>
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
