import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';
import { Inventario } from '../models/inventario';

@Pipe({
  name: 'filtroInventario'
})
export class FiltroInventarioPipe implements PipeTransform {

  transform(inventario: Inventario[], searchText: string): any {
    if (searchText == null) return inventario;
        return inventario.filter(p =>
        p.idProducto.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1);
    }

}
