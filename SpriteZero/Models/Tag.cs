using System.ComponentModel.DataAnnotations;

namespace SpriteZero
{
    public class Tag
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
