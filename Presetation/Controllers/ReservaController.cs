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
    public class ReservaController : ControllerBase
    {
        private readonly ReservaService _reservaService;
        
        public ReservaController(HotelContext context)
        {
            _reservaService = new ReservaService(context);
        }
        // GET: api/Reserva
        [Authorize]
        [HttpGet]
        public IEnumerable<ReservaViewModel> Gets()
        {
            var recepcionistas = _reservaService.ConsultarTodos().Select(p=> new ReservaViewModel(p));
            return recepcionistas;
        }

        // GET: api/Recepcionista/5
        [Authorize]
        [HttpGet("{identificacion}")]
        public ActionResult<ReservaViewModel> Get(int identificacion)
        {
            var reserva = _reservaService.BuscarxIdentificacion(identificacion);
            if (reserva == null) return NotFound();
            var reservaViewModel = new ReservaViewModel(reserva);
            return reservaViewModel;
        }

        // POST: api/Reserva
        [Authorize]
        [HttpPost]
        public ActionResult<ReservaViewModel> Post(ReservaInputModel reservaInput)
        {
            Reserva reserva = MapearReserva(reservaInput);
            var response = _reservaService.Guardar(reserva);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar reserva", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Reserva);
        }
        
        // DELETE: api/Reserva/5
        [Authorize]
        [HttpDelete("{identificacion}")]
        public ActionResult<int> Delete(int identificacion)
        {
            string mensaje = _reservaService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        private Reserva MapearReserva(ReservaInputModel reservaInput)
        {
            var reserva = new Reserva
            {
                IdReserva = reservaInput.IdReserva,
                FechaInicio = reservaInput.FechaInicio,
                FechaFin = reservaInput.FechaFin,
                CantidadPersonas = reservaInput.CantidadPersonas,
                IdCliente = reservaInput.IdCliente,
                IdHabitacion = reservaInput.IdHabitacion,
            };
            return reserva;
        }
        
        // PUT: api/Reserva/5
        [Authorize]
        [HttpPut("{identificacion}")]
        public ActionResult<ReservaViewModel> Put(string identificacion, ReservaInputModel reservaInput)
        {
            Reserva reserva = MapearReserva(reservaInput);
            var id=_reservaService.BuscarxIdentificacion(reserva.IdReserva);
            if(id==null){
                return BadRequest("No encontrado");
            }else
            {
                var response = _reservaService.Modificar(reserva);
                if (response.Error) 
                {
                    ModelState.AddModelError("Modificar Reserva", response.Mensaje);
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                return Ok(response.Reserva);                
            }
        }
    }
}