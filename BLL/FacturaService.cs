using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using Datos;

namespace Logica
{
    public class FacturaService
    {
        private readonly HotelContext _context;

        public FacturaService(HotelContext context)
        {
            _context=context;
        }

        public GuardarFacturaResponse Guardar(Factura factura)
        {
            try
            {
                var facturaBuscada = _context.Facturas.Find(factura.IdFactura);
                if (facturaBuscada != null)
                {
                    return new GuardarFacturaResponse("Error esta Factura ya se encuentra registrada");
                }
                _context.Facturas.Add(factura);
                _context.SaveChanges();
                return new GuardarFacturaResponse(factura);
            }
            catch (Exception e)
            {
                return new GuardarFacturaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Factura> ConsultarTodos()
        {
            List<Factura> facturas = _context.Facturas.ToList();
            return facturas;
        }

        public string Eliminar(int identificacion)
        {
            try
            {
                var factura = _context.Facturas.Find(identificacion);
                if (factura != null)
                {                    
                    _context.Facturas.Remove(factura);
                    _context.SaveChanges();
                    return ($"El registro {factura.IdFactura} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, {identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return $"Error de la Aplicación: {e.Message}";
            }
        }

        public ModificarFacturaResponse Modificar(Factura facturaNueva)
        {            
            try
            {
                var facturaVieja = _context.Facturas.Find(facturaNueva.IdFactura);
                if (facturaVieja != null)
                {
                    facturaVieja.IdFactura=facturaNueva.IdFactura;
                    facturaVieja.IdReserva=facturaNueva.IdReserva;
                    facturaVieja.SubTotal=facturaNueva.SubTotal;
                    facturaVieja.Total=facturaNueva.Total;
                    _context.Facturas.Update(facturaVieja);
                    _context.SaveChanges();
                    return new ModificarFacturaResponse(facturaVieja);
                }
                else
                {
                    return new ModificarFacturaResponse($"Lo sentimos, {facturaNueva.IdFactura} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return new ModificarFacturaResponse($"Error de la Aplicación: {e.Message}");
            }
        }

        public Factura BuscarxIdentificacion(int identificacion)
        {
            Factura factura = _context.Facturas.Find(identificacion);
            return factura;
        }

        public class GuardarFacturaResponse
        {
            public GuardarFacturaResponse(Factura factura)
            {
                Error = false;
                Factura = factura;
            }
            public GuardarFacturaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Factura Factura { get; set; }
        }

        public class ModificarFacturaResponse
        {
            public ModificarFacturaResponse(Factura factura)
            {
                Error = false;
                Factura = factura;
            }
            public ModificarFacturaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Factura Factura { get; set; }
        }        
    }
}