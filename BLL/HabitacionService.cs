using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using Datos;

namespace Logica
{
    public class HabitacionService
    {
        private readonly HotelContext _context;

        public HabitacionService(HotelContext context)
        {
            _context=context;
        }

        public GuardarHabitacionResponse Guardar(Habitacion habitacion)
        {
            try
            {
                var habitacionBuscada = _context.Habitaciones.Find(habitacion.IdHabitacion);
                if (habitacionBuscada != null)
                {
                    return new GuardarHabitacionResponse("Error esta habitacion ya se encuentra registrada");
                }
                _context.Habitaciones.Add(habitacion);
                _context.SaveChanges();
                return new GuardarHabitacionResponse(habitacion);
            }
            catch (Exception e)
            {
                return new GuardarHabitacionResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Habitacion> ConsultarTodos()
        {
            List<Habitacion> habitaciones = _context.Habitaciones.ToList();
            return habitaciones;
        }

        public string Eliminar(string identificacion)
        {
            try
            {
                var habitacion = _context.Habitaciones.Find(identificacion);
                if (habitacion != null)
                {                    
                    _context.Habitaciones.Remove(habitacion);
                    _context.SaveChanges();
                    return ($"El registro {habitacion.IdHabitacion} se ha eliminado satisfactoriamente.");
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

        public ModificarHabitacionResponse Modificar(Habitacion habitacionNueva)
        {            
            try
            {
                var habitacionVieja = _context.Habitaciones.Find(habitacionNueva.IdHabitacion);
                if (habitacionVieja != null)
                {
                    habitacionVieja.IdHabitacion=habitacionNueva.IdHabitacion;
                    habitacionVieja.Tipo=habitacionNueva.Tipo;
                    habitacionVieja.Precio=habitacionNueva.Precio;
                    habitacionVieja.Descripcion=habitacionNueva.Descripcion;
                    habitacionVieja.Aire=habitacionNueva.Aire;
                    habitacionVieja.Ventilador=habitacionNueva.Ventilador;
                    habitacionVieja.Disponibilidad=habitacionNueva.Disponibilidad;
                    _context.Habitaciones.Update(habitacionVieja);
                    _context.SaveChanges();
                    return new ModificarHabitacionResponse(habitacionVieja);
                }
                else
                {
                    return new ModificarHabitacionResponse($"Lo sentimos, {habitacionNueva.IdHabitacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return new ModificarHabitacionResponse($"Error de la Aplicación: {e.Message}");
            }
        }

        public Habitacion BuscarxIdentificacion(string identificacion)
        {
            Habitacion habitacion = _context.Habitaciones.Find(identificacion);
            return habitacion;
        }

        public class GuardarHabitacionResponse
        {
            public GuardarHabitacionResponse(Habitacion habitacion)
            {
                Error = false;
                Habitacion = habitacion;
            }
            public GuardarHabitacionResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Habitacion Habitacion { get; set; }
        }

        public class ModificarHabitacionResponse
        {
            public ModificarHabitacionResponse(Habitacion habitacion)
            {
                Error = false;
                Habitacion = habitacion;
            }
            public ModificarHabitacionResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Habitacion Habitacion { get; set; }
        }
    }
}