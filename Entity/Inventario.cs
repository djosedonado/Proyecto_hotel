using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Inventario
    {
        [Key]
        public int IdInventario { get; set; }
        
        public DateTime FechaCompra{ get; set; }
        public decimal CostoProducto { get; set; }
        public string IdProducto { get; set; }
        public int CantidadComprada { get; set; }
        public decimal TotalCompra { get; set; }

        public Inventario()
        {
            
        }
        public Inventario( decimal costoProducto, string idProducto, int cantidadComprada, decimal totalCompra)
        {
            
            CostoProducto = costoProducto;
            IdProducto = idProducto;
            CantidadComprada = cantidadComprada;
            TotalCompra = totalCompra * cantidadComprada;   
        }
        
        
    }
}