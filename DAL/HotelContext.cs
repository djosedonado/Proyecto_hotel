using Microsoft.EntityFrameworkCore;
using Entity;
namespace Datos
{
    public class HotelContext : DbContext
    {
        public HotelContext(DbContextOptions options) : base(options)
        {            
        }
        public DbSet<Cliente> Clientes {get; set;}
        //public DbSet<Compra> Compras {get; set;}
        public DbSet<Factura> Facturas {get; set;}
        public DbSet<Habitacion> Habitaciones {get; set;}
        public DbSet<Inventario> Inventarios {get; set;}
        public DbSet<Producto> Productos {get; set;}
        public DbSet<Recepcionista> Recepcionistas {get; set;}
        public DbSet<Reserva> Reservas {get; set;}
        public DbSet<Users> Userss {get; set;}
    }
}