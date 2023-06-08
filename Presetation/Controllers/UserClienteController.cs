using Hotel.Models;
using Datos;
using Microsoft.Extensions.Options;
using Hotel.ClientApp.Config;
using Hotel.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Logica;
using Microsoft.AspNetCore.Http;
using Entity;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserClienteController: ControllerBase
    {
        private readonly UsersService _UserService;
        
        public UserClienteController(HotelContext context)
        {
            _UserService = new UsersService(context);
        }

        // POST: api/User
        [Authorize]
        [HttpPost]
        public ActionResult<UsersViewModel> Post(UsersInputModel userInput)
        {
            Users user = MapearUser(userInput);
            user.FirstName="xxxx";
            user.LastName="xxxx";
            user.Estado="AC";
            var response = _UserService.Guardar(user);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar user", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Users);
        }

        private Users MapearUser(UsersInputModel usersInput)
        {
            var user = new Users
            {
                UserName = usersInput.UserName,
                Password = usersInput.Password,
                TipoUsuario = usersInput.TipoUsuario,
                
            };
            return user;
        }

        
        
    }
}