using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Helpers
{
    public class InAppStorageService : IFileStorageService
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IWebHostEnvironment env;
        private readonly IHostingEnvironment hostingEnvironment;

        public InAppStorageService(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env, IHostingEnvironment hostingEnvironment)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.env = env;
            this.hostingEnvironment = hostingEnvironment;
        }
        public Task DeleteFile(string fileRoute, string containerName)
        {
            if (string.IsNullOrEmpty(fileRoute))
                return Task.CompletedTask;

            var fileName = Path.GetFileName(fileRoute);
            var fileDirectory = Path.Combine(env.WebRootPath, containerName, fileName);

            if (File.Exists(fileDirectory))
                File.Delete(fileDirectory);

            return Task.CompletedTask;
        }

        public async Task<string> EditFile(string containerName, IFormFile file, string fileRoute)
        {
            await DeleteFile(fileRoute, containerName);
            return await SaveFile(containerName, file);
        }

        public async Task<string> SaveFile(string containerName, IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(env.WebRootPath, containerName);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string route = Path.Combine(folder, fileName);
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                var content = ms.ToArray();
                await File.WriteAllBytesAsync(route, content);
            }

            var url = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            var routeForDB = Path.Combine(url, containerName, fileName).Replace("\\", "/");
            return routeForDB;
        }
    }
}
