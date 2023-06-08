import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';

@Pipe({
  name: 'filtroProducto'
})
export class FiltroProductoPipe implements PipeTransform {

  transform(producto: Producto[], searchText: string): any {
    if (searchText == null) return producto;
        return producto.filter(p =>
        p.idProducto.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1 ||
        p.nombre.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1||
        p.tipo.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1);
    }

}
