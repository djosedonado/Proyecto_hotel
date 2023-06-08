using System;
using System.Collections.Generic;
using System.Linq;
using Datos;
using Entity;

namespace Logica
{
    public class CompraService
    {
        private readonly HotelContext _context;

        public CompraService(HotelContext context)
        {
            _context=context;
        }
/*
        public GuardarCompraResponse Guardar(Compra compra)
        {
            try
            {
                var compraBuscada = _context.Clientes.Find(compra.IdCompra);
                if (compraBuscada != null)
                {
                    return new GuardarCompraResponse("Error la compras ya se encuentra registrada");
                }
                _context.Compras.Add(compra);
                _context.SaveChanges();
                return new GuardarCompraResponse(compra);
            }
            catch (Exception e)
            { 
                return new GuardarCompraResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Compra> ConsultarTodos()
        {
            List<Compra> compras = _context.Compras.ToList();
            return compras;
        }

        public string Eliminar(int identificacion)
        {
            try
            {
                var compra = _context.Compras.Find(identificacion);
                if (compra != null)
                {
                    _context.Compras.Remove(compra);
                    _context.SaveChanges();
                    return ($"El registro {compra.IdCompra} se ha eliminado satisfactoriamente.");
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

        public Compra BuscarxIdentificacion(int identificacion)
        {
            Compra compra = _context.Compras.Find(identificacion);
            return compra;
        }

        public class GuardarCompraResponse
        {
            public GuardarCompraResponse(Compra compra)
            {
                Error = false;
                Compra = compra;
            }
            public GuardarCompraResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public Compra Compra { get; set;}
            public string Mensaje { get; set; }
        }

        public ModificarCompraResponse Modificar(Compra compraNueva)
        {            
            try
            {
                var compraVieja = _context.Compras.Find(compraNueva.IdCompra);
                if (compraVieja != null)
                {
                    compraVieja.IdCompra=compraNueva.IdCompra;
                    compraVieja.IdProducto=compraNueva.IdProducto;
                    compraVieja.FechaCompra=compraNueva.FechaCompra;
                    compraVieja.CantidadProductos=compraNueva.CantidadProductos;
                    compraVieja.TotalCompra=compraNueva.TotalCompra;
                    
                    _context.Compras.Update(compraVieja);
                    _context.SaveChanges();
                    return new ModificarCompraResponse(compraVieja);
                }
                else
                {
                    return new ModificarCompraResponse($"Lo sentimos, {compraNueva.IdCompra} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return new ModificarCompraResponse($"Error de la Aplicación: {e.Message}");
            }
        }

        public class ModificarCompraResponse
        {
            public ModificarCompraResponse(Compra compra)
            {
                Error = false;
                Compra = compra;
            }
            public ModificarCompraResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Compra Compra { get; set; }
        }*/
        
    }
}