using System;
using System.ComponentModel.DataAnnotations;

namespace SpriteZero.Models
{
    public class Image
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Src { get; set; }
        public double Price { get; set; }
        [Required]
        public int Height { get; set; }
        [Required]
        public int Width { get; set; }
        public string Notes { get; set; }
        [Required]
        public string Title { get; set; }
        public Boolean Sheet { get; set; }
        public int Upvotes { get; set; }
        public int Downvotes { get; set; }
        public string Artist { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
