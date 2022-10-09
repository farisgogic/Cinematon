using System.Net;
using System.Net.Mail;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Helpers;

namespace WebAPI
{
    public class MailJet : IEmail
    {
        public async Task Send(string email, string naslov, string body, EmailOptionsDTO options) { 

            var client = new SmtpClient();
            client.Host = options.Host;
            client.Credentials = new NetworkCredential(options.ApiKey, options.ApiKeySecret);
            client.Port = options.Port;

            var poruka = new MailMessage(options.SenderEmail, email);
            poruka.Body = body;
            poruka.Subject = naslov;
            poruka.IsBodyHtml = true;

            await client.SendMailAsync(poruka);
        }
    }
}
