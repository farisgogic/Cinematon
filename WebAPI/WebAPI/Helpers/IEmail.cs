using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTO;

namespace WebAPI.Helpers
{
    public interface IEmail
    {
        Task Send(string email, string naslov, string body, EmailOptionsDTO options);
    }
}
