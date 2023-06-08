using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Models
{
    public class FacturaInputModel
    {
        public int IdFactura            { get; set; }

        [Required(ErrorMessage = "La id de la reserva es requerida")]
        public string IdReserva         { get; set; }

        public decimal SubTotal         { get; set; }

        [Required(ErrorMessage = "El Total es requerido")]
        public decimal Total            { get; set; }
    
    }
    public class FacturaViewModel : FacturaInputModel
    {
        public FacturaViewModel()
        {
        }
        public FacturaViewModel(Factura factura)
        {
            IdFactura = factura.IdFactura;
            IdReserva = factura.IdReserva;
            SubTotal = factura.SubTotal;
            Total = factura.Total;
        }
    }
}