using Entity;
using System;
using System.Collections.Generic;
using Datos;
using System.Linq;

namespace Logica
{
    public class UsersService
    {
        private readonly HotelContext _context;

        public UsersService(HotelContext context)
        {
            _context=context;
        }

        
        public Users Validate(string usuario, string password)
        {
            
            return _context.Userss.Where(u => u.UserName == usuario && u.Password == password && u.Estado== "AC").FirstOrDefault();
        }


        public GuardarUsersResponse Guardar(Users user)
        {
            try
            {
                var userBuscado = _context.Userss.Find(user.UserName);
                if (userBuscado != null)
                {
                    return new GuardarUsersResponse("Error el usuario ya se encuentra registrado");
                }
                _context.Userss.Add(user);
                _context.SaveChanges();
                return new GuardarUsersResponse(user);
            }
            catch (Exception e)
            {
                return new GuardarUsersResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Users> ConsultarTodos()
        {
            List<Users> Userss = _context.Userss.ToList();
            return Userss;
        }

        public string Eliminar(string identificacion)
        {
            try
            {
                var users = _context.Userss.Find(identificacion);
                if (users != null)
                {
                    _context.Userss.Remove(users);
                    _context.SaveChanges();
                    return ($"El registro {users.UserName} se ha eliminado satisfactoriamente.");
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

        
        public Users BuscarxIdentificacion(string identificacion)
        {
            Users users = _context.Userss.Find(identificacion);
            return users;
        }

        public class GuardarUsersResponse
        {
            public GuardarUsersResponse(Users users)
            {
                Error = false;
                Users = users;
            }
            public GuardarUsersResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Users Users { get; set; }
        }

        
    }
}