using Microsoft.AspNetCore.Mvc;

namespace PoryectoDoogYou.Controllers
{
    public class GetViewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
