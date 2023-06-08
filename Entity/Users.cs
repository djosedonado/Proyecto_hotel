using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Users
    {
        [Key]
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string MobilePhone { get; set; }
        public string Email { get; set; }
        public string Estado { get; set; }
        public string TipoUsuario { get; set; }

        public string Token { get; set; }
        
    }
}