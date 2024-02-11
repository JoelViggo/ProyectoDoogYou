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

    }
}
