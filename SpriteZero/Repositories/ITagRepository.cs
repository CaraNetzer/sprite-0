using SpriteZero.Models;
using System.Collections.Generic;

namespace SpriteZero
{
    public interface ITagRepository
    {
        public List<Tag> GetAllTags();
        public Tag GetTagById(int id);
        public void Add(Tag tag);
        public void Delete(int id);
        public void Update(Tag tag);
        public void InsertTag(ImageTag it);
        public List<Tag> GetImageTags(int imageId);
    }
}