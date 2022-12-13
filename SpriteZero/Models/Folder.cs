using System.ComponentModel.DataAnnotations;

namespace SpriteZero
{
    public class Folder
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int UserId { get; set; }
    }
}
