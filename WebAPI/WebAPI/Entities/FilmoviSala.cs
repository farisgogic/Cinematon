namespace WebAPI.Entities
{
    public class FilmoviSala
    {
        public int SalaId { get; set; }
        public int FilmoviId { get; set; }
        public Sala Sala { get; set; }
        public Filmovi Filmovi { get; set; }
    }
}
