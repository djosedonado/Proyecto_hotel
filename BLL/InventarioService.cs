using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using Datos;

namespace Logica
{
    public class InventarioService
    {
        private readonly HotelContext _context;
        public Inventario inventario_;
        public InventarioService(HotelContext context)
        {
            _context=context;
        }
        
/*
        public GuardarInventarioResponse Comprar(Inventario inventario, int cantidad)
        {
            try
            {
                var inventarioBuscado = _context.Inventarios.Find(inventario.IdInventario);
                if (inventarioBuscado != null)
                {   
                    inventarioBuscado.Cantidad -= cantidad;
                    _context.Inventarios.Update(inventarioBuscado);
                    _context.SaveChanges();
                    return new GuardarInventarioResponse("Compra realizada con exito");
                }
                else
                {
                    inventario.Cantidad = cantidad;
                    _context.Inventarios.Add(inventario);
                    _context.SaveChanges();
                    return new GuardarInventarioResponse(inventario);

                }
            }
            catch (Exception e)
            {
                return new GuardarInventarioResponse($"Error de la Aplicacion: {e.Message}");
            }

        }*/
 
        public GuardarInventarioResponse Guardar(Inventario inventario)
        {
            try
            {
                var inventarioBuscado = _context.Inventarios.Find(inventario.IdInventario);
                
                if (inventarioBuscado != null)
                {
                    return new GuardarInventarioResponse("Error este Inventario ya se encuentra registrado");
                }
                _context.Inventarios.Add(inventario);
                _context.SaveChanges();
                return new GuardarInventarioResponse(inventario);
            }
            catch (Exception e)
            {
                return new GuardarInventarioResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Inventario> ConsultarTodos()
        {
            List<Inventario> inventarios = _context.Inventarios.ToList();
            return inventarios;
        }

        

        

        public Inventario BuscarxIdentificacion(string identificacion)
        {
            Inventario inventario = _context.Inventarios.Find(identificacion);
            return inventario;
        }

        public class GuardarInventarioResponse
        {
            public GuardarInventarioResponse(Inventario inventario)
            {
                Error = false;
                Inventario = inventario;
            }
            public GuardarInventarioResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Inventario Inventario { get; set; }
        }

        
        

        
        
    }
}