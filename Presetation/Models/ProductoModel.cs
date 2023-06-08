using System.Net.Http.Headers;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Models
{
    public class ProductoInputModel
    {
        [Required(ErrorMessage = "La identificacion es requerida")]
        public string IdProducto { get; set; }

        [Required(ErrorMessage = "El nombre del producto es requerido")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El Tipo de producto es requerido")]
        public string Tipo { get; set; }

        [Required(ErrorMessage = "El Precio es requerido")]
        public decimal Precio { get; set; }
        
        [Required(ErrorMessage = "la cantidad es requerida")]
        public int Cantidad {get;set;}

    }

    public class ProductoViewModel : ProductoInputModel
    {
        public ProductoViewModel()
        {

        }
        public ProductoViewModel(Producto producto)
        {
            IdProducto = producto.IdProducto;
            Nombre = producto.Nombre;
            Tipo = producto.Tipo;
            Precio = producto.Precio;
            Cantidad=producto.Cantidad;
        }
    }
}