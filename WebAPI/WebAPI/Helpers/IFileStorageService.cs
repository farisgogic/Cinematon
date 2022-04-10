using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Helpers
{
    public interface IFileStorageService
    {
        Task DeleteFile(string fileRoute, string containerName);
        Task<string> SaveFile(string containerName, IFormFile file);
        Task<string> EditFile(string containerName, IFormFile file, string fileRoute);

      
    }
}
