using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Habitacion
    {
        [Key]
        public string IdHabitacion { get; set; }
        public string Tipo { get; set; }
        public decimal Precio { get; set; }
        public string Descripcion { get; set; }
        public string Aire { get; set; }
        public string Ventilador { get; set; }
        public string Disponibilidad { get; set; }
    }
}