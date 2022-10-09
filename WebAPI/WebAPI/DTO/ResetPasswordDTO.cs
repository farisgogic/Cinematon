using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class ResetPasswordDTO
    {
        [Required]
        public string Email { get; set; }
    }
}
