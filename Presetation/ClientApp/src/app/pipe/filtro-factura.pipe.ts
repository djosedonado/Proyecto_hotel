import { Pipe, PipeTransform } from '@angular/core';
import { Factura } from '../models/factura';

@Pipe({
  name: 'filtroFactura'
})
export class FiltroFacturaPipe implements PipeTransform {

  transform(factura: Factura[], searchText: any): any {
    if (searchText == null) return factura;
        return factura.filter(p =>
        p.idFactura==searchText ||
        p.total==searchText ||
        p.idReserva.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1);
    }

}
