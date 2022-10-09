using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTO
{
    public class ConfirmEmailDTO
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string UserId { get; set; }
    }
}
