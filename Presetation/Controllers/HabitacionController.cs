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
    public class HabitacionController : ControllerBase
    {
        private readonly HabitacionService _habitacionService;
        
        public HabitacionController(HotelContext context)
        {
            _habitacionService = new HabitacionService(context);
        }
        // GET: api/Habitacion
        [HttpGet]
        public IEnumerable<HabitacionViewModel> Gets()
        {
            var habitaciones = _habitacionService.ConsultarTodos().Select(p=> new HabitacionViewModel(p));
            return habitaciones;
        }

        // GET: api/Habitacion/5
        [Authorize]
        [HttpGet("{IdHabitacion}")]
        public ActionResult<HabitacionViewModel> Get(string IdHabitacion)
        {
            var habitacion = _habitacionService.BuscarxIdentificacion(IdHabitacion);
            if (habitacion == null) return NotFound();
            var habitacionViewModel = new HabitacionViewModel(habitacion);
            return habitacionViewModel;
        }

        // POST: api/Habitacion
        [Authorize]
        [HttpPost]
        public ActionResult<HabitacionViewModel> Post(HabitacionInputModel habitacionInput)
        {
            Habitacion habitacion = MapearHabitacion(habitacionInput);
            var response = _habitacionService.Guardar(habitacion);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar habitacion", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Habitacion);
        }
        
        // DELETE: api/Habitacion/5
        [Authorize]
        [HttpDelete("{IdHabitacion}")]
        public ActionResult<string> Delete(string IdHabitacion)
        {
            string mensaje = _habitacionService.Eliminar(IdHabitacion);
            return Ok(mensaje);
        }

        private Habitacion MapearHabitacion(HabitacionInputModel habitacionInput)
        {
            var habitacion = new Habitacion
            {
                IdHabitacion = habitacionInput.IdHabitacion,
                Tipo = habitacionInput.Tipo,
                Precio = habitacionInput.Precio,
                Descripcion = habitacionInput.Descripcion,
                Aire = habitacionInput.Aire,
                Ventilador = habitacionInput.Ventilador,
                Disponibilidad = habitacionInput.Disponibilidad,
            };
            return habitacion;
        }
        
        // PUT: api/Habitacion/5
        [Authorize]
        [HttpPut("{IdHabitacion}")]
        public ActionResult<HabitacionViewModel> Put(string IdHabitacion, HabitacionInputModel habitacionInput)
        {
            Habitacion habitacion = MapearHabitacion(habitacionInput);
            var id=_habitacionService.BuscarxIdentificacion(habitacion.IdHabitacion);
            if(id==null){
                return BadRequest("No encontrado");
            }else
            {
                var response = _habitacionService.Modificar(habitacion);
                if (response.Error) 
                {
                    ModelState.AddModelError("Modificar Habitacion", response.Mensaje);
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                return Ok(response.Habitacion);                
            }
        }
    }
}