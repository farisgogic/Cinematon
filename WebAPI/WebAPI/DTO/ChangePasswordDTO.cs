using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class ChangePasswordDTO
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
