using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Models
{

    public class HabitacionInputModel
    {
        [Required(ErrorMessage = "La identificacion es requerida")]
        public string IdHabitacion { get; set; }

        [Required(ErrorMessage = "El Tipo de habitacion es requerido")]
        public string Tipo { get; set; }

        [Required(ErrorMessage = "Debe agregar unaa descripción")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "El Precio es requerido")]
        public decimal Precio { get; set; }

        public string Aire { get; set; }

        public string Ventilador { get; set; }

        public string Disponibilidad { get; set; }
    }

    public class HabitacionViewModel : HabitacionInputModel
    {
        public HabitacionViewModel()
        {

        }
        public HabitacionViewModel(Habitacion habitacion)
        {
            IdHabitacion = habitacion.IdHabitacion;
            Tipo = habitacion.Tipo;
            Precio = habitacion.Precio;
            Descripcion = habitacion.Descripcion;
            Aire = habitacion.Aire;
            Ventilador = habitacion.Ventilador;
            Disponibilidad = habitacion.Disponibilidad;
        }
    }
}