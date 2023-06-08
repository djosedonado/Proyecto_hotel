using Entity;
using System;
using System.Collections.Generic;
using Datos;
using System.Linq;

namespace Logica
{
    public class ClienteService
    {
        private readonly HotelContext _context;

        public ClienteService(HotelContext context)
        {
            _context=context;
        }

        public GuardarClienteResponse Guardar(Cliente cliente)
        {
            try
            {
                var clienteBuscado = _context.Clientes.Find(cliente.Identificacion);
                if (clienteBuscado != null)
                {
                    return new GuardarClienteResponse("Error el cliente ya se encuentra registrado");
                }
                _context.Clientes.Add(cliente);
                _context.SaveChanges();
                return new GuardarClienteResponse(cliente);
            }
            catch (Exception e)
            { 
                return new GuardarClienteResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Cliente> ConsultarTodos()
        {
            List<Cliente> clientes = _context.Clientes.ToList();
            return clientes;
        }

        public string Eliminar(string identificacion)
        {
            try
            {
                var cliente = _context.Clientes.Find(identificacion);
                if (cliente != null)
                {
                    _context.Clientes.Remove(cliente);
                    _context.SaveChanges();
                    return ($"El registro {cliente.Nombre} se ha eliminado satisfactoriamente.");
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

        public ModificarClienteResponse ModificarCliente(Cliente clienteNuevo)
        {            
            try
            {
                var clienteViejo = _context.Clientes.Find(clienteNuevo.Identificacion);
                if (clienteViejo != null)
                {
                    clienteViejo.Identificacion=clienteNuevo.Identificacion;
                    clienteViejo.Nombre=clienteNuevo.Nombre;
                    clienteViejo.Edad=clienteNuevo.Edad;
                    clienteViejo.Sexo=clienteNuevo.Sexo;                    
                    clienteViejo.Direccion=clienteNuevo.Direccion;
                    clienteViejo.Celular=clienteNuevo.Celular;
                    clienteViejo.Correo=clienteNuevo.Correo;
                    clienteViejo.Usuario=clienteNuevo.Usuario;
                    clienteViejo.Password=clienteNuevo.Password;
                    _context.Clientes.Update(clienteViejo);
                    _context.SaveChanges();
                    return new ModificarClienteResponse(clienteViejo);
                }
                else
                {
                    return new ModificarClienteResponse($"Lo sentimos, {clienteNuevo.Identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return new ModificarClienteResponse($"Error de la Aplicación: {e.Message}");
            }
        }

        public Cliente BuscarxIdentificacion(string identificacion)
        {
            Cliente cliente = _context.Clientes.Find(identificacion);
            return cliente;
        }

        public class GuardarClienteResponse
        {
            public GuardarClienteResponse(Cliente cliente)
            {
                Error = false;
                Cliente = cliente;
            }
            public GuardarClienteResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Cliente Cliente { get; set; }
        }

        public class ModificarClienteResponse
        {
            public ModificarClienteResponse(Cliente cliente)
            {
                Error = false;
                Cliente = cliente;
            }
            public ModificarClienteResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Cliente Cliente { get; set; }
        }
    }
}