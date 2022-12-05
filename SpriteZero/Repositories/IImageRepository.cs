using System.Collections.Generic;
using Microsoft.Extensions.Hosting;
using SpriteZero.Models;

namespace SpriteZero
{
    public interface IImageRepository
    {
        public List<Image> GetAll();
        public Image GetById(int id);
        public List<Image> GetByUser(int userId);
        public void Insert(Models.Image image);
        public void Delete(int id);
        public List<Models.Image> Search(string criterion);
        public void Update(Image image);
    }
}