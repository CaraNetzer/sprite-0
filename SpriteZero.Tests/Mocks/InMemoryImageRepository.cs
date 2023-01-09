using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using SpriteZero.Models;
using SpriteZero.Repositories;

namespace SpriteZero.Tests.Mocks
{
    class InMemoryImageRepository: IImageRepository
    {
        private readonly List<Image> _data;

        public List<Image> InternalData
        {
            get
            {
                return _data;
            }
        }

        public InMemoryImageRepository(List<Image> startingData)
        {
            _data = startingData;
        }

        public void Insert(Image post)
        {
            var lastPost = _data.Last();
            post.Id = lastPost.Id + 1;
            _data.Add(post);
        }

        public void Delete(int id)
        {
            var postTodelete = _data.FirstOrDefault(p => p.Id == id);
            if (postTodelete == null)
            {
                return;
            }

            _data.Remove(postTodelete);
        }

        public List<Image> GetAll()
        {
            return _data;
        }

        public Image GetById(int id)
        {
            return _data.FirstOrDefault(p => p.Id == id);
        }

        public void Update(Image post)
        {
            var currentImage = _data.FirstOrDefault(p => p.Id == post.Id);
            if (currentImage == null)
            {
                return;
            }

            currentImage.Src = post.Src;
            currentImage.Price = post.Price;
            currentImage.Height = post.Height;
            currentImage.Width = post.Width;
            currentImage.Notes = post.Notes;
            currentImage.Title = post.Title;
            currentImage.Sheet = post.Sheet;
            currentImage.Upvotes = post.Upvotes;
            currentImage.Artist = post.Artist;
            currentImage.UserId = post.UserId;


        }

        public List<Image> Search(string criterion)
        {
            throw new NotImplementedException();
        }

        public List<Image> GetByUser(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
