using Microsoft.AspNetCore.Mvc;
using PoryectoDoogYou.Models;

namespace PoryectoDoogYou.Controllers
{
    public class PostDataController : Controller
    {
        [HttpPost]
        public IActionResult PostMascota([FromBody]MascotaModel model)
        {
            List<MascotaModel> lMascota = new List<MascotaModel>();
            lMascota.Add(model);
            // crear data context y realizar inserción de datos.

            
            return Json(new { Response = true });
        }
    }
}
