using Entity;
using System;
using System.Collections.Generic;
using Datos;
using System.Linq;

namespace Logica
{
    public class RecepcionistaService
    {
        private readonly HotelContext _context;

        public RecepcionistaService(HotelContext context)
        {
            _context = context;
        }

        public GuardarRecepcionistaResponse Guardar(Recepcionista recepcionista)
        {
            try
            {
                var recepcionistaBuscado = _context.Recepcionistas.Find(recepcionista.Identificacion);
                if (recepcionistaBuscado != null)
                {
                    return new GuardarRecepcionistaResponse("Error, esta persona ya se encuentra registrada como recepcionista!");
                }
                _context.Recepcionistas.Add(recepcionista);
                _context.SaveChanges();
                return new GuardarRecepcionistaResponse(recepcionista);
            }
            catch (Exception e)
            {
                return new GuardarRecepcionistaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Recepcionista> ConsultarTodos()
        {
            List<Recepcionista> recepcionistas = _context.Recepcionistas.ToList();
            return recepcionistas;
        }

        public string Eliminar(string identificacion)
        {
            try
            {
                var recepcionista = _context.Recepcionistas.Find(identificacion);
                if (recepcionista != null)
                {
                    _context.Recepcionistas.Remove(recepcionista);
                    _context.SaveChanges();
                    return ($"El registro {recepcionista.Nombre} se ha eliminado satisfactoriamente.");
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

        public ModificarRecepcionistaResponse ModificarRecepcionista(Recepcionista recepcionistaNuevo)
        {            
            try
            {
                var recepcionistaViejo = _context.Recepcionistas.Find(recepcionistaNuevo.Identificacion);
                if (recepcionistaViejo != null)
                {
                    recepcionistaViejo.Identificacion=recepcionistaNuevo.Identificacion;
                    recepcionistaViejo.Nombre=recepcionistaNuevo.Nombre;
                    recepcionistaViejo.Edad=recepcionistaNuevo.Edad;
                    recepcionistaViejo.Sexo=recepcionistaNuevo.Sexo;
                    recepcionistaViejo.Direccion=recepcionistaNuevo.Direccion;
                    recepcionistaViejo.Celular=recepcionistaNuevo.Celular;
                    recepcionistaViejo.Correo=recepcionistaNuevo.Correo;
                    recepcionistaViejo.Usuario=recepcionistaNuevo.Usuario;
                    recepcionistaViejo.Password=recepcionistaNuevo.Password;
                    _context.Recepcionistas.Update(recepcionistaViejo);
                    _context.SaveChanges();
                    return new ModificarRecepcionistaResponse(recepcionistaViejo);
                }
                else
                {
                    return new ModificarRecepcionistaResponse($"Lo sentimos, {recepcionistaNuevo.Identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {

                return new ModificarRecepcionistaResponse($"Error de la Aplicación: {e.Message}");
            }
        }

        public Recepcionista BuscarxIdentificacion(string identificacion)
        {
            Recepcionista recepcionista = _context.Recepcionistas.Find(identificacion);
            return recepcionista;
        }

        public class GuardarRecepcionistaResponse
        {
            public GuardarRecepcionistaResponse(Recepcionista recepcionista)
            {
                Error = false;
                Recepcionista = recepcionista;
            }
            public GuardarRecepcionistaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Recepcionista Recepcionista { get; set; }
        }

        public class ModificarRecepcionistaResponse
        {
            public ModificarRecepcionistaResponse(Recepcionista recepcionista)
            {
                Error = false;
                Recepcionista = recepcionista;
            }
            public ModificarRecepcionistaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Recepcionista Recepcionista { get; set; }
        }
    }
}