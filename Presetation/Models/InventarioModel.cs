using System;
using Entity;

namespace Hotel.Models
{
    public class InventarioInputModel 
    {
        public int IdInventario { get; set; }
        public DateTime FechaCompra  { get; set; } 
        public string IdProducto { get; set; }
        public int CantidadComprada { get; set; }
        public decimal CostoProducto { get; set; }
        public decimal TotalCompra { get; set; }
    }

    public class InventarioViewModel : InventarioInputModel
    {
        public InventarioViewModel()
        {

        }
        public InventarioViewModel(Inventario inventario)
        {
            IdInventario = inventario.IdInventario;
            FechaCompra=inventario.FechaCompra;
            FechaCompra = DateTime.Now;
            IdProducto = inventario.IdProducto;
            CostoProducto=inventario.CostoProducto;
            CantidadComprada = inventario.CantidadComprada;
            TotalCompra = inventario.TotalCompra;
            
        }
    }

}