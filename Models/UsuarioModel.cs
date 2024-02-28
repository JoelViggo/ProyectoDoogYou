namespace PoryectoDoogYou.Models
{
    public class UsuarioModel
    {
        public int? idDueño { get; set; }
        public string? nombreDueño { get; set; }
        public string? apellido { get; set; }
        public string? correo { get; set; }
        public string? telefono { get; set;}
        public string? tipo { get; set; } = "Dueño";
        public string? residencia { get; set; }
        public string? descripcion { get; set;}
        public string? comuna { get; set; }
        public string? contraseña { get; set; }
        public string? usuario { get; set; }
        public int idMascota { get; set;}



    }
}
