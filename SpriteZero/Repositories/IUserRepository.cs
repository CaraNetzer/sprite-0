using System.Collections.Generic;

namespace SpriteZero.Repositories
{
    public interface IUserRepository
    {
        public User GetByEmail(string email);
        public void Add(User user);
        public List<User> GetAll();
        public User GetUserById(int id);
        public void Update(User user);
    }
}