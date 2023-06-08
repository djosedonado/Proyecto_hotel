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
    
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        UsersService _usersService;
        HotelContext _context;  
        JwtService _jwtService;
        public UsersController(HotelContext context, IOptions<AppSetting> appSettings)
        {
            _context = context;
            var admin = _context.Userss.Find("admin");
            if (admin == null)
            {
                _context.Userss.Add(new Entity.Users() 
                { 
                    UserName = "admin", 
                    Password = "admin", 
                    Email = "admin@gmail.com", 
                    Estado = "AC", 
                    FirstName = "Adminitrador", 
                    LastName = "    ", 
                    MobilePhone = "318000",
                    TipoUsuario="Administrador" });

                var registrosGuardados = _context.SaveChanges();

            }
            _usersService = new UsersService(context);
            _jwtService = new JwtService(appSettings);
        }
        
        

        [AllowAnonymous]
        [HttpPost]
        [Authorize]
        public ActionResult<UsersViewModel> Login([FromBody]UsersInputModel model)
        {
            var user = _usersService.Validate(model.UserName, model.Password);

            if(user!=null){
                var response = _jwtService.GenerateToken(user);
                response.Estado=user.Estado;
                response.TipoUsuario=user.TipoUsuario;
                return Ok(response);
            }

            return BadRequest("Usuario o clave es incorrecta");
            
        }


    }
}