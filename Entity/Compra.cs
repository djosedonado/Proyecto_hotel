using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Compra
    {
        [Key]
        public int IdCompra { get; set; }
        public string IdProducto { get; set; }
        public DateTime FechaCompra { get; set; }
        public int CantidadProductos { get; set; }
        public decimal TotalCompra { get; set; }
    }
}