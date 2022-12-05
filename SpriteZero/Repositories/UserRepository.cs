using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using SpriteZero.Models;


namespace SpriteZero.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Username, Email
                        FROM [User]
                        WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Username = DbUtils.GetString(reader, "Username"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (Email, Username)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Email, @Username)";
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Username", user.Username);                    

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, Username, Email
                            FROM [User]";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Username = DbUtils.GetString(reader, "Username"),
                            Email = DbUtils.GetString(reader, "Email")
                        });
                    }

                    reader.Close();

                    return users;

                }
            }
        }
        
        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Username, Email
                          FROM [User]
                          WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Username = DbUtils.GetString(reader, "Username"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public void Update(User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                {
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE [User]
                                                SET Email = @Email,
                                                    Username = @Username
                                                WHERE id  = @id";

                        cmd.Parameters.AddWithValue("@id", user.Id);
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        cmd.Parameters.AddWithValue("@Username", user.Username);


                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
