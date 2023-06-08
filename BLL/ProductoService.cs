using Entity;
using System;
using System.Collections.Generic;
using Datos;
using System.Linq;

namespace Logica
{
    public class ProductoService
    {
        private readonly HotelContext _context;

        public ProductoService(HotelContext context)
        {
            _context = context;
        }

        public GuardarProductoResponse Comprar(Producto producto, int cantidad)
        {
            try
            {
                var productoBuscado = _context.Productos.Find(producto.IdProducto);
                if (productoBuscado != null)
                {   
                    productoBuscado.Cantidad -= cantidad;
                    _context.Productos.Update(productoBuscado);
                    
                    Inventario inventario = new Inventario(productoBuscado.Precio,productoBuscado.IdProducto,cantidad,productoBuscado.Precio);
                    _context.Inventarios.Add(inventario);
                    
                    _context.SaveChanges();
                    return new GuardarProductoResponse("Compra realizada con exito");
                }
                else
                {

                    return new GuardarProductoResponse($"No se pudo comprar:");

                }
            }
            catch (Exception e)
            {
                return new GuardarProductoResponse($"Error de la Aplicacion: {e.Message}");
            }

        }

        public GuardarProductoResponse Guardar(Producto producto)
        {
            try
            {
                var productoBuscado = _context.Productos.Find(producto.IdProducto);
                if (productoBuscado != null)
                {
                    return new GuardarProductoResponse("Error este producto ya se encuentra registrado");
                }
                _context.Productos.Add(producto);
                _context.SaveChanges();
                return new GuardarProductoResponse(producto);
            }
            catch (Exception e)
            {
                return new GuardarProductoResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Producto> ConsultarTodos()
        {
            List<Producto> productos = _context.Productos.ToList();
            return productos;
        }

        public string Eliminar(string identificacion)
        {
            try
            {
                var producto = _context.Productos.Find(identificacion);
                if (producto != null)
                {
                    _context.Productos.Remove(producto);
                    _context.SaveChanges();
                    return ($"El registro {producto.IdProducto} se ha eliminado satisfactoriamente.");
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

        public ModificarProductoResponse Modificar(Producto productoNuevo)
        {
            try
            {
                var productoViejo = _context.Productos.Find(productoNuevo.IdProducto);
                if (productoViejo != null)
                {
                    productoViejo.IdProducto = productoNuevo.IdProducto;
                    productoViejo.Nombre = productoNuevo.Nombre;
                    productoViejo.Tipo = productoNuevo.Tipo;
                    productoViejo.Precio = productoNuevo.Precio;
                    productoViejo.Cantidad=productoNuevo.Cantidad;
                    _context.Productos.Update(productoViejo);
                    _context.SaveChanges();
                    return new ModificarProductoResponse(productoViejo);
                }
                else
                {
                    return new ModificarProductoResponse($"Lo sentimos, {productoNuevo.IdProducto} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return new ModificarProductoResponse($"Error de la Aplicación: {e.Message}");
            }
        }

        public Producto BuscarxIdentificacion(string identificacion)
        {
            Producto producto = _context.Productos.Find(identificacion);
            return producto;
        }

        public class GuardarProductoResponse
        {
            public GuardarProductoResponse(Producto producto)
            {
                Error = false;
                Producto = producto;
            }
            public GuardarProductoResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Producto Producto { get; set; }
        }

        public class ModificarProductoResponse
        {
            public ModificarProductoResponse(Producto producto)
            {
                Error = false;
                Producto = producto;
            }
            public ModificarProductoResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Producto Producto { get; set; }
        }
    }
}