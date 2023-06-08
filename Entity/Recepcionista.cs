using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Recepcionista
    {
        [Key]
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public int Edad { get; set; }
        public string Sexo { get; set; }
        public string Direccion { get; set; }
        public string Celular { get; set; }
        public string Correo { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }   
    }
}