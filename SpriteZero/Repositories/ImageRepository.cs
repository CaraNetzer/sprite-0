using System;
using System.Collections.Generic;
using System.Security.Policy;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SpriteZero.Models;
using System.Linq;
using Microsoft.Extensions.Hosting;
using SpriteZero.Repositories;
using static System.Net.Mime.MediaTypeNames;

namespace SpriteZero
{
    public class ImageRepository : BaseRepository, IImageRepository
    {
        public ImageRepository(IConfiguration configuration) : base(configuration) { }

        public List<Models.Image> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT i.id, i.src, i.price, i.width, i.height, i.notes, i.title, i.sheet, i.upvotes, i.downvotes, i.artist, i.userId as ImageUserId, u.id as UserId, u.username, t.Id as TagId, t.Name as TagName
                                        FROM Image i
                                        JOIN [User] u on i.userId = u.Id
                                        left join [ImageTag] pt on i.Id = pt.ImageId
                                        left join [Tag] t on pt.TagId = t.Id
                                        ORDER BY i.upvotes DESC;";

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Models.Image> images = new List<Models.Image>();
                    while (reader.Read())
                    {
                        var imageId = DbUtils.GetInt(reader, "Id");

                        var existingImage = images.FirstOrDefault(i => i.Id == imageId);
                        if (existingImage == null)
                        { 
                            existingImage = new Models.Image()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Src = DbUtils.GetString(reader, "src"),
                                Price = (double)DbUtils.GetNullableDouble(reader, "Price"),
                                Width = DbUtils.GetInt(reader, "Width"),
                                Height = DbUtils.GetInt(reader, "Height"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Sheet = reader.GetBoolean(reader.GetOrdinal("Sheet")),
                                Upvotes = (int)DbUtils.GetNullableInt(reader, "Upvotes"),
                                Downvotes = (int)DbUtils.GetNullableInt(reader, "Downvotes"),
                                Artist = DbUtils.GetString(reader, "Artist"),
                                UserId = DbUtils.GetInt(reader, "ImageUserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Username = DbUtils.GetString(reader, "Username")
                                },
                                Tags = new List<Tag>()
                            };

                            images.Add(existingImage);
                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            existingImage.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
                    }

                    reader.Close();

                    return images;
                }
            }
        }

        public Models.Image GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT i.id, i.src, i.price, i.width, i.height, i.notes, i.title, i.sheet, i.upvotes, i.downvotes, i.artist, i.userId as ImageUserId, u.id as UserId, u.username, t.Id as TagId, t.Name as TagName
                                        FROM Image i
                                        JOIN [User] u on i.userId = u.Id
                                        left join [ImageTag] pt on i.Id = pt.ImageId
                                        left join [Tag] t on pt.TagId = t.Id
                                        WHERE i.id = @id";
                    cmd.Parameters.AddWithValue("id", id);
                    SqlDataReader reader = cmd.ExecuteReader();

                    Models.Image image = null;

                    while (reader.Read())
                    {
                        if (image == null)
                        {
                            image = new Models.Image()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Src = DbUtils.GetString(reader, "src"),
                                Price = (double)DbUtils.GetNullableDouble(reader, "Price"),
                                Width = DbUtils.GetInt(reader, "Width"),
                                Height = DbUtils.GetInt(reader, "Height"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Sheet = reader.GetBoolean(reader.GetOrdinal("Sheet")),
                                Upvotes = (int)DbUtils.GetNullableInt(reader, "Upvotes"),
                                Downvotes = (int)DbUtils.GetNullableInt(reader, "Downvotes"),
                                Artist = DbUtils.GetString(reader, "Artist"),
                                UserId = DbUtils.GetInt(reader, "ImageUserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Username = DbUtils.GetString(reader, "Username")
                                },
                                Tags = new List<Tag>()
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            image.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
                    }

                    reader.Close();

                    return image;
                }
            }
        }

        public List<Models.Image> GetByUser(int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT i.id, i.src, i.price, i.width, i.height, i.notes, i.title, i.sheet, i.upvotes, i.downvotes, i.artist, i.userId as ImageUserId, u.id as UserId, u.username, t.Id as TagId, t.Name as TagName
                                        FROM Image i
                                        JOIN [User] u on i.userId = u.Id
                                        left join [ImageTag] pt on i.Id = pt.ImageId
                                        left join [Tag] t on pt.TagId = t.Id
                                        WHERE i.UserId = @userId
                                        ORDER BY i.upvotes DESC;";
                    cmd.Parameters.AddWithValue("userId", userId);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Models.Image> images = new List<Models.Image>();
                    while (reader.Read())
                    {
                        var imageId = DbUtils.GetInt(reader, "Id");

                        var existingImage = images.FirstOrDefault(i => i.Id == imageId);
                        if (existingImage == null)
                        {
                            existingImage = new Models.Image()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Src = DbUtils.GetString(reader, "src"),
                                Price = (double)DbUtils.GetNullableDouble(reader, "Price"),
                                Width = DbUtils.GetInt(reader, "Width"),
                                Height = DbUtils.GetInt(reader, "Height"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Sheet = reader.GetBoolean(reader.GetOrdinal("Sheet")),
                                Upvotes = (int)DbUtils.GetNullableInt(reader, "Upvotes"),
                                Downvotes = (int)DbUtils.GetNullableInt(reader, "Downvotes"),
                                Artist = DbUtils.GetString(reader, "Artist"),
                                UserId = DbUtils.GetInt(reader, "ImageUserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Username = DbUtils.GetString(reader, "Username")
                                },
                                Tags = new List<Tag>()
                            };

                            images.Add(existingImage);
                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            existingImage.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
                    }

                    reader.Close();

                    return images;
                }
            }
        }

        public void Insert(Models.Image image)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Image] ([Src], [Price], [Width], [Height], [Notes], [Title], [Sheet], [Upvotes], [Downvotes], [Artist], [UserId])
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Src, @Price, @Width, @Height, @Notes,
                            @Title, @Sheet, @Upvotes, @Downvotes, @Artist, @UserId )";
                    DbUtils.AddParameter(cmd, "@Src", image.Src);
                    DbUtils.AddParameter(cmd, "@Price", image.Price); 
                    DbUtils.AddParameter(cmd, "@Width", image.Width);
                    DbUtils.AddParameter(cmd, "@Height", image.Height);
                    DbUtils.AddParameter(cmd, "@Notes", image.Notes);
                    DbUtils.AddParameter(cmd, "@Title", image.Title);
                    DbUtils.AddParameter(cmd, "@Sheet", image.Sheet);
                    DbUtils.AddParameter(cmd, "@Upvotes", image.Upvotes);
                    DbUtils.AddParameter(cmd, "@Downvotes", image.Downvotes);
                    DbUtils.AddParameter(cmd, "@Artist", image.Artist);
                    DbUtils.AddParameter(cmd, "@UserId", image.UserId);

                    image.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Image WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Models.Image image)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                {
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE [Image]
                                                SET Src = @Src, 
                                                    Price = @Price, 
                                                    Width = @Width, 
                                                    Height = @Height, 
                                                    Notes = @Notes,
                                                    Title = @Title, 
                                                    Sheet = @Sheet, 
                                                    Upvotes = @Upvotes,
                                                    Downvotes = @Downvotes,
                                                    Artist = @Artist,
                                                    UserId = @UserId
                                                WHERE id  = @id";
                        
                        DbUtils.AddParameter(cmd, "@Id", image.Id);
                        DbUtils.AddParameter(cmd, "@Src", image.Src);
                        DbUtils.AddParameter(cmd, "@Price", image.Price);
                        DbUtils.AddParameter(cmd, "@Width", image.Width);
                        DbUtils.AddParameter(cmd, "@Height", image.Height);
                        DbUtils.AddParameter(cmd, "@Notes", image.Notes);
                        DbUtils.AddParameter(cmd, "@Title", image.Title);
                        DbUtils.AddParameter(cmd, "@Sheet", image.Sheet);
                        DbUtils.AddParameter(cmd, "@Upvotes", image.Upvotes);
                        DbUtils.AddParameter(cmd, "@Downvotes", image.Downvotes);
                        DbUtils.AddParameter(cmd, "@Artist", image.Artist);
                        DbUtils.AddParameter(cmd, "@UserId", image.UserId);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }

        public List<Models.Image> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql =
                        @"SELECT i.id, i.src, i.price, i.width, i.height, i.notes, i.title, i.sheet, i.upvotes, i.downvotes, i.artist, i.userId as ImageUserId, u.id as UserId, u.username, t.Id as TagId, t.Name as TagName
                            FROM Image i
                            JOIN [User] u on i.userId = u.Id
                            left join [ImageTag] pt on i.Id = pt.ImageId
                            left join [Tag] t on pt.TagId = t.Id
                            WHERE i.Title LIKE @Criterion OR i.Notes LIKE @Criterion OR t.Name LIKE @Criterion
                            ORDER BY i.upvotes DESC";                    

                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    
                    var reader = cmd.ExecuteReader();

                    var images = new List<Models.Image>();
                    while (reader.Read())
                    {
                        var imageId = DbUtils.GetInt(reader, "Id");

                        var existingImage = images.FirstOrDefault(i => i.Id == imageId);
                        if (existingImage == null)
                        {
                            existingImage = new Models.Image()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Src = DbUtils.GetString(reader, "src"),
                                Price = (double)DbUtils.GetNullableDouble(reader, "Price"),
                                Width = DbUtils.GetInt(reader, "Width"),
                                Height = DbUtils.GetInt(reader, "Height"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Sheet = reader.GetBoolean(reader.GetOrdinal("Sheet")),
                                Upvotes = (int)DbUtils.GetNullableInt(reader, "Upvotes"),
                                Downvotes = (int)DbUtils.GetNullableInt(reader, "Downvotes"),
                                Artist = DbUtils.GetString(reader, "Artist"),
                                UserId = DbUtils.GetInt(reader, "ImageUserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Username = DbUtils.GetString(reader, "Username")
                                },
                                Tags = new List<Tag>()
                            };

                            images.Add(existingImage);
                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            existingImage.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
                    }

                    reader.Close();

                    return images;
                }
            }
        }        
    }
}