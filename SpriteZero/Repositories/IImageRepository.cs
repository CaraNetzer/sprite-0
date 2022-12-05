using System.Collections.Generic;
using SpriteZero.Models;

namespace SpriteZero
{
    internal interface IImageRepository
    {
        public List<Image> GetAll();
    }
}