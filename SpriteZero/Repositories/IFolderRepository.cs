using SpriteZero.Models;
using System.Collections.Generic;

namespace SpriteZero
{
    public interface IFolderRepository
    {
        public List<Folder> GetAllFolders();
        public Folder GetFolderById(int id);
        public List<Folder> GetImageFolders(int imageId);
        public void Add(Folder folder);
        public void Delete(int id);
        public void Update(Folder folder);
        public void InsertIntoFolder(ImageFolder it);
        public void RemoveFromFolder(ImageFolder it);
        public List<Folder> GetAllFoldersByUser(int userId);
        public List<Image> GetFolderImages(int folderId);
    }
}