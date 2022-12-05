using System.Collections.Generic;
using SpriteZero.Models;

namespace SpriteZero
{
    public interface IImageRepository
    {
        public List<Image> GetAll();
    }
}