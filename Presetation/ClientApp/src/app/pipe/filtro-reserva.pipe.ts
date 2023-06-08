import { Pipe, PipeTransform } from '@angular/core';
import { Reserva } from '../models/reserva';

@Pipe({
  name: 'filtroReserva'
})
export class FiltroReservaPipe implements PipeTransform {

  transform(reserva: Reserva[], searchText: string): any {
    if (searchText == null) return reserva;
        return reserva.filter(p =>
          p.idHabitacion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
          p.fechaInicio.toString().indexOf(searchText.toLowerCase()) !== -1 ||
          p.fechaFin.toString().indexOf(searchText.toLowerCase()) !== -1);
    }
}
