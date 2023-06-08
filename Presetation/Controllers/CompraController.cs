using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Hotel.Models;
using Datos;
using Microsoft.Extensions.Options;
using Hotel.ClientApp.Config;
using Hotel.Service;
using Microsoft.AspNetCore.Authorization;
using static Hotel.Models.CompraInputModel;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraController : ControllerBase 
    {
        private readonly ProductoService _productoService;

        public CompraController(HotelContext context)
        {
            _productoService = new ProductoService(context);
        }

        // POST: api/Producto
        [HttpPost]
        public ActionResult<ProductoViewModel> Post(ProductoInputModel productoInput)
        {
            Producto producto = MapearProducto(productoInput);
            producto.IdProducto= productoInput.IdProducto;
            producto.Nombre=productoInput.Nombre;
            producto.Tipo=productoInput.Tipo;
            producto.Precio=productoInput.Precio;
            //var enviarAInventario = _inventarioService.Guardar(producto,productoInput.Cantidad);
            var response = _productoService.Comprar(producto, productoInput.Cantidad);
            if (response.Error)
            {
                ModelState.AddModelError("Guardar producto", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Producto);
        }
        private Producto MapearProducto(ProductoInputModel productoInput)
        {
            var producto = new Producto
            {
                IdProducto = productoInput.IdProducto,
                Nombre = productoInput.Nombre,
                Tipo = productoInput.Tipo,
                Precio = productoInput.Precio,
                Cantidad=productoInput.Cantidad
            };
            return producto;
        }





        /*
        // GET: api/Compra
        [Authorize]
        [HttpGet]
        public IEnumerable<CompraViewModel> Gets()
        {
            var compras = _compraService.ConsultarTodos().Select(p=> new CompraViewModel(p));
            return compras;
        }

        // GET: api/Compra/5
        [Authorize]
        [HttpGet("{identificacion}")]
        public ActionResult<CompraViewModel> Get(int identificacion)
        {
            var compra = _compraService.BuscarxIdentificacion(identificacion);
            if (compra == null) return NotFound();
            var compraViewModel = new CompraViewModel(compra);
            return compraViewModel;
        }

        // POST: api/Compra
        [Authorize]
        [HttpPost]
        public ActionResult<CompraViewModel> Post(CompraInputModel compraInput)
        {
            Compra compra = MapearCompra(compraInput);
            var response = _compraService.Guardar(compra);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar compra", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Compra);
        }

        // DELETE: api/Compra/5
        [Authorize]
        [HttpDelete("{identificacion}")]
        public ActionResult<int> Delete(int identificacion)
        {
            string mensaje = _compraService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        private Compra MapearCompra(CompraInputModel compraInput)
        {
            var compra = new Compra
            {
                IdCompra = compraInput.IdCompra,
                IdProducto = compraInput.IdProducto,
                FechaCompra = compraInput.FechaCompra,
                CantidadProductos = compraInput.CantidadProductos,
                TotalCompra = compraInput.TotalCompra,
            };
            return compra;
        }

        // PUT: api/Compra/5
        [Authorize]
        [HttpPut("{identificacion}")]
        public ActionResult<CompraViewModel> Put(int identificacion, CompraInputModel compraInput)
        {
            Compra compra = MapearCompra(compraInput);
            var id=_compraService.BuscarxIdentificacion(compra.IdCompra);
            if(id==null){
                return BadRequest("No encontrado");
            }else
            {
                var response = _compraService.Modificar(compra);
                if (response.Error) 
                {
                    ModelState.AddModelError("Modificar compra", response.Mensaje);
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                return Ok(response.Compra);                
            }
        }*/


    }
}