using Microsoft.AspNetCore.Mvc;
using PoryectoDoogYou.Models;

namespace PoryectoDoogYou.Controllers
{
    public class GetDataController : Controller
    {
        [HttpGet]       
        public IActionResult GetPet()
        {
            List<MascotaModel> model = new List<MascotaModel>();

            

            return Json(new { mascota = model });
        }
        [HttpGet]
        public IActionResult GetUser()
        {
            UsuarioModel model = new UsuarioModel();
                model.nombreDueño = "Juan";
                model.apellido = "Santander";
                model.residencia = "Santiago de Chile";
                model.comuna = "La Cistnera";
                model.descripcion = "Soy alguien tranqui, solo busco chamba";
                model.correo = "juanito@sapbe.com";
                model.telefono = "xxx-xxx-xxx";
                model.tipo = "Dueño";
                model.idMascota = 1;
                model.idDueño = 1;
                model.usuario = "JuanUser";
                model.contraseña = "pass123";




            return Json(new { user = model });
        }

    }
}
