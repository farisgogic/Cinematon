using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Validations
{
    public class PrvoSlovoVeliko:ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(value==null || string.IsNullOrEmpty(value.ToString()))
            {
                return ValidationResult.Success;
            }

            var prvoSlovo = value.ToString()[0].ToString();
            if (prvoSlovo != prvoSlovo.ToUpper())
            {
                return new ValidationResult("Prvo slovo mora biti veliko");
            }

            return ValidationResult.Success;
        }
    }
}
