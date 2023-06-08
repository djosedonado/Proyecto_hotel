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

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        public InventarioService _inventarioService;
        public InventarioController(HotelContext context)
        {
            _inventarioService = new InventarioService(context);
        }

        // GET: api/Inventario
        [HttpGet]
        public IEnumerable<InventarioViewModel> Gets()
        {
            var inventarios = _inventarioService.ConsultarTodos().Select(p => new InventarioViewModel(p));
            return inventarios;
        }

        // GET: api/Inventario/5
        [Authorize]
        [HttpGet("{IdInventario}")]
        public ActionResult<InventarioViewModel> Get(string IdInventario)
        {
            var inventario = _inventarioService.BuscarxIdentificacion(IdInventario);
            if (inventario == null) return NotFound();
            var inventarioViewModel = new InventarioViewModel(inventario);
            return inventarioViewModel;
        }

        // POST: api/Inventario
        [HttpPost]
        public ActionResult<InventarioViewModel> Post(InventarioInputModel inventarioInput)
        {
            Inventario inventario = MapearInventario(inventarioInput);
            var response = _inventarioService.Guardar(inventario);
            if (response.Error)
            {
                ModelState.AddModelError("Guardar producto", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Inventario);
        }
        private Inventario MapearInventario(InventarioInputModel inventarioInput)
        {
            var inventario = new Inventario
            {
                IdInventario= inventarioInput.IdInventario,
                IdProducto = inventarioInput.IdProducto,
                FechaCompra = inventarioInput.FechaCompra,
                CostoProducto=inventarioInput.CostoProducto,
                CantidadComprada = inventarioInput.CantidadComprada,
                TotalCompra = inventarioInput.TotalCompra
            };
            return inventario;
        }


    }
}