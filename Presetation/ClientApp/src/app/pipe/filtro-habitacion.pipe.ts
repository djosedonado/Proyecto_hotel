import { Pipe, PipeTransform } from '@angular/core';
import { Habitacion } from '../models/habitacion';

@Pipe({
  name: 'filtroHabitacion'
})
export class FiltroHabitacionPipe implements PipeTransform {

  transform(habitacion: Habitacion[], searchText: string): any {
    if (searchText == null) return habitacion;
        return habitacion.filter(p =>
        p.idHabitacion.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1 ||
        p.tipo.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1);
    }

}
