CREATE DATABASE [HotelFloresta];

USE  [HotelFloresta]
CREATE TABLE [dbo].[Users](    
    [Usuario] [nvarchar](30) PRIMARY KEY,
    [Password] [nvarchar](30) NULL,
	[TipoUsuario] [nvarchar](20) NULL,
    [Identificacion] [nvarchar](10) NULL
)
GO

USE  [HotelFloresta]
CREATE TABLE [dbo].[Cliente](
	[Identificacion] [nvarchar](10) NOT NULL PRIMARY KEY,
	[Nombre] [nvarchar](100) NULL,
	[Edad] [int] NULL,
    [Sexo] [nvarchar](2) NULL,
	[Direccion] [nvarchar](50) NULL,
    [Celular] [nvarchar](15) NULL,
    [Correo] [nvarchar](80) NULL,
    [Usuario] [nvarchar](30) NULL,
    [Password] [nvarchar](50) NULL,
    CONSTRAINT fk_UsuarioC FOREIGN KEY (Usuario) REFERENCES Users (Usuario)
) 
GO

USE  [HotelFloresta]
CREATE TABLE [dbo].[Habitacion](
	[IdHabitacion] [nvarchar](5) NOT NULL PRIMARY KEY,
	[Tipo] [nvarchar](20) NULL,
    [Precio] [numeric](18, 0) NULL,
    [Descripcion] [nvarchar](100) NULL,
	[Aire] [nvarchar](2) NULL,
    [Ventilador] [nvarchar](2) NULL,
    [Disponibilidad] [nvarchar](2) NULL,
) 
GO

USE  [HotelFloresta]
CREATE TABLE [dbo].[Producto](
	[IdProducto] [nvarchar](10) NOT NULL PRIMARY KEY,
    [Nombre] [nvarchar](100) NULL,
	[Tipo] [nvarchar](20) NULL,
    [Precio] [numeric](18, 0) NULL,
) 
GO

USE  [HotelFloresta]
CREATE TABLE [dbo].[Recepcionista](
	[Identificacion] [nvarchar](10) NOT NULL PRIMARY KEY,
	[Nombre] [nvarchar](100) NULL,
	[Edad] [int] NULL,
    [Sexo] [nvarchar](2) NULL,
	[Direccion] [nvarchar](50) NULL,
    [Celular] [nvarchar](15) NULL,
    [Correo] [nvarchar](80) NULL,
    [Usuario] [nvarchar](30) NULL,
    [Password] [nvarchar](50) NULL,
    CONSTRAINT fk_UsuarioF FOREIGN KEY (Usuario) REFERENCES Users (Usuario)
) 
GO

USE  [HotelFloresta]
CREATE TABLE [dbo].[Reserva](
	[IdReserva] int IDENTITY(1,1) PRIMARY KEY,
	[FechaInicio] [DateTime] NULL,
	[FechaFin] [DateTime] NULL,
    [CantidadPersonas] [numeric](18, 0) NULL,
	[IdCliente] [nvarchar](10) NULL,
    [IdHabitacion] [nvarchar](5) NULL,
    CONSTRAINT fk_IdCliente FOREIGN KEY (IdCliente) REFERENCES Cliente (Identificacion),
    CONSTRAINT fk_IdHabitacion FOREIGN KEY (IdHabitacion) REFERENCES Habitacion (IdHabitacion)
) 
GO



-------------------------------------- or
USE  [HotelFloresta]
alter table Reserva 
	add 
		 FOREIGN KEY (IdCliente) REFERENCES Cliente (Identificacion),
		 FOREIGN KEY (IdHabitacion) REFERENCES Habitacion (IdHabitacion)
-------------------------------------- or


GO

COMMIT