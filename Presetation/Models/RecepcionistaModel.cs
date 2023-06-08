using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Models
{
    public class RecepcionistaInputModel
    {
        [Required(ErrorMessage = "La identificacion es requerida")]
        public string Identificacion { get; set; }
        
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        
        [Range(1, 99, ErrorMessage = "La edad debe estar en un rango de 1 a 99")]
        public int Edad { get; set; }

        [SexoValidacionRecepcionista( ErrorMessage="El Sexo de ser F o M")]
        public string Sexo { get; set; }

        [Required(ErrorMessage = "La direccion es requerida")]
        public string Direccion { get; set; }
        
        [Required(ErrorMessage = "El celular es requerido")]
        public string Celular { get; set; }
        
       [Required] 
       /* /<email-pattern>|<phone-pattern>/ */
       [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$|^\+?\d{0,2}\-?\d{4,5}\-?\d{5,6}", ErrorMessage = "Debe ingresar un correo electronico valido")] 
        public string Correo { get; set; }
        
        [Required(ErrorMessage = "El Usuario es requerido")]
        public string Usuario { get; set; }
        
        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; }  
    }

    public class SexoValidacionRecepcionista : ValidationAttribute{
        protected override ValidationResult IsValid(object value, ValidationContext validationContext) 
        {
            if ((value.ToString().ToUpper() == "M") || (value.ToString().ToUpper() == "F"))
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult(ErrorMessage);
            }
        }
    }

    public class RecepcionistaViewModel : RecepcionistaInputModel
    {
        public RecepcionistaViewModel()
        {

        }
        public RecepcionistaViewModel(Recepcionista recepcionista)
        {
            Identificacion = recepcionista.Identificacion;
            Nombre = recepcionista.Nombre;
            Edad = recepcionista.Edad;
            Sexo = recepcionista.Sexo;
            Direccion = recepcionista.Direccion;
            Celular = recepcionista.Celular;
            Correo = recepcionista.Correo;
            Usuario = recepcionista.Usuario;
            Password = recepcionista.Password;
        }
    }
}