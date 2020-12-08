using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        // Fully defining relationship, this will ake sure that EF deletes the photos when
        // the owner AppUser is deleted as well
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}