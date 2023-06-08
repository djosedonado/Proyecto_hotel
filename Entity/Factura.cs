using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Factura
    {
        [Key]
        public int IdFactura    { get; set; }
        public string IdReserva { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total    { get; set; }
    }
}