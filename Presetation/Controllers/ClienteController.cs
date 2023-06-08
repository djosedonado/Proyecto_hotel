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
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService _clienteService;

        public ClienteController(HotelContext context)
        {
            _clienteService = new ClienteService(context);
        }
        
        // GET: api/Cliente
        [Authorize]
        [HttpGet]
        public IEnumerable<ClienteViewModel> Gets()
        {
            var clientes = _clienteService.ConsultarTodos().Select(p=> new ClienteViewModel(p));
            return clientes;
        }

        // GET: api/Cliente/5
        [Authorize]
        [HttpGet("{identificacion}")]
        public ActionResult<ClienteViewModel> Get(string identificacion)
        {
            var cliente = _clienteService.BuscarxIdentificacion(identificacion);
            if (cliente == null) return NotFound();
            var clienteViewModel = new ClienteViewModel(cliente);
            return clienteViewModel;
        }

        // POST: api/Cliente
        [Authorize]
        [HttpPost]
        public ActionResult<ClienteViewModel> Post(ClienteInputModel clienteInput)
        {
            Cliente cliente = MapearCliente(clienteInput);
            var response = _clienteService.Guardar(cliente);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Cliente", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Cliente);   
        }
        
        // DELETE: api/Cliente/5
        [Authorize]
        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = _clienteService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        private Cliente MapearCliente(ClienteInputModel clienteInput)
        {
            var cliente = new Cliente
            { 
                Identificacion = clienteInput.Identificacion,
                Nombre = clienteInput.Nombre,
                Edad = clienteInput.Edad,
                Sexo = clienteInput.Sexo,
                Direccion = clienteInput.Direccion,
                Celular = clienteInput.Celular,
                Correo = clienteInput.Correo,
                Usuario = clienteInput.Usuario,
                Password = clienteInput.Password,
            };
            return cliente;
        }
        
        // PUT: api/Cliente/5
        [HttpPut("{identificacion}")]
        [Authorize]
        public ActionResult<ClienteViewModel> Put(string identificacion, ClienteInputModel clienteInput)
        {
            Cliente cliente = MapearCliente(clienteInput);
            var id=_clienteService.BuscarxIdentificacion(cliente.Identificacion);
            if(id==null){
                return BadRequest("No encontrado");
            }else
            {
                var response = _clienteService.ModificarCliente(cliente);
                if (response.Error) 
                {
                    ModelState.AddModelError("Modificar Cliente", response.Mensaje);
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                return Ok(response.Cliente);                
            }
        }
    }
}