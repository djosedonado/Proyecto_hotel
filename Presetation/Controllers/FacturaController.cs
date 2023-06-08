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
    public class FacturaController : ControllerBase
    {
        private readonly FacturaService _facturaService;
        
        public FacturaController(HotelContext context)
        {
            _facturaService = new FacturaService(context);
        }

        // GET: api/Factura
        [HttpGet]
        [Authorize]
        public IEnumerable<FacturaViewModel> Gets()
        {
            var facturas = _facturaService.ConsultarTodos().Select(p=> new FacturaViewModel(p));
            return facturas;
        }

        // GET: api/Factura/5
        [Authorize]
        [HttpGet("{identificacion}")]
        public ActionResult<FacturaViewModel> Get(int identificacion)
        {
            var factura = _facturaService.BuscarxIdentificacion(identificacion);
            if (factura == null) return NotFound();
            var facturaViewModel = new FacturaViewModel(factura);
            return facturaViewModel;
        }

        // POST: api/Factura
        [Authorize]
        [HttpPost]
        public ActionResult<FacturaViewModel> Post(FacturaInputModel facturaInput)
        {
            Factura factura = MapearFactura(facturaInput);
            var response = _facturaService.Guardar(factura);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar factura", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Factura);
        }

        // DELETE: api/Factura/5
        [Authorize]
        [HttpDelete("{identificacion}")]
        public ActionResult<int> Delete(int identificacion)
        {
            string mensaje = _facturaService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        private Factura MapearFactura(FacturaInputModel facturaInput)
        {
            var factura = new Factura
            {
                IdFactura = facturaInput.IdFactura,
                IdReserva = facturaInput.IdReserva,
                SubTotal = facturaInput.SubTotal,
                Total = facturaInput.Total,
            };
            return factura;
        }

        // PUT: api/Factura/5
        [Authorize]
        [HttpPut("{identificacion}")]
        public ActionResult<FacturaViewModel> Put(int identificacion, FacturaInputModel facturaInput)
        {
            Factura factura = MapearFactura(facturaInput);
            var id=_facturaService.BuscarxIdentificacion(factura.IdFactura);
            if(id==null){
                return BadRequest("No encontrado");
            }else
            {
                var response = _facturaService.Modificar(factura);
                if (response.Error) 
                {
                    ModelState.AddModelError("Modificar factura", response.Mensaje);
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                return Ok(response.Factura);                
            }
        }
        
    }
}