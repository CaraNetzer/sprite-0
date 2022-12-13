using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SpriteZero.Models;
using System.Linq;
using Microsoft.Extensions.Hosting;
using SpriteZero.Repositories;
using SpriteZero;

namespace SpriteZero
{
    public class FolderRepository : BaseRepository, IFolderRepository
    {
        public FolderRepository(IConfiguration config) : base(config) { }

        public List<Folder> GetAllFolders()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, UserId FROM Folder";
                    var reader = cmd.ExecuteReader();

                    List<Folder> folders = new List<Folder>();

                    while (reader.Read())
                    {
                        folders.Add(new Folder()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId"))
                        });
                    }
                    reader.Close();
                    return folders;
                }
            }
        }

        public List<Folder> GetAllFoldersByUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, UserId FROM Folder WHERE UserId = @userId";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    var reader = cmd.ExecuteReader();

                    List<Folder> folders = new List<Folder>();

                    while (reader.Read())
                    {
                        folders.Add(new Folder()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId"))
                        });
                    }
                    reader.Close();
                    return folders;
                }
            }
        }

        public Folder GetFolderById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id,[Name], UserId
                        FROM Folder
                        WHERE Id = @id
                        
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Folder folder = new Folder
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId"))
                        };

                        reader.Close();
                        return folder;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public List<Folder> GetImageFolders(int imageId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [if].Id as ImageFolderId, [if].ImageId, [if].FolderId, f.UserId, f.[Name]
                        FROM ImageFolder [if]
                        LEFT JOIN Folder f on [if].FolderId = f.Id 
                        WHERE [if].ImageId = @id                       
                    ";

                    cmd.Parameters.AddWithValue("@id", imageId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Folder> folders = new List<Folder>();
                    while (reader.Read())
                    {
                        folders.Add(new Folder
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("FolderId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId"))
                        });

                    }
                    reader.Close();
                    return folders;
                }
            }
        }

        public List<Image> GetFolderImages(int folderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [if].Id as ImageFolderId, [if].ImageId, [if].FolderId, i.id, i.src, i.price, i.width, i.height, i.notes, i.title, i.sheet, i.upvotes, i.downvotes, i.artist, i.userId as ImageUserId
                        FROM ImageFolder [if]
                        join image i on [if].ImageId = i.id
                        WHERE [if].FolderId = @folderId                       
                    ";

                    cmd.Parameters.AddWithValue("@folderId", folderId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Image> folderImages = new List<Image>();
                    while (reader.Read())
                    {
                        folderImages.Add(new Image
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
                            UserId = DbUtils.GetInt(reader, "ImageUserId")
                        });

                    }
                    reader.Close();
                    return folderImages;
                }
            }
        }

        public void Add(Folder folder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Folder (
                            Name, UserId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @UserId )";
                    cmd.Parameters.AddWithValue("@Name", folder.Name);
                    cmd.Parameters.AddWithValue("@UserId", folder.UserId);


                    folder.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"
                            DELETE FROM Folder
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Folder folder)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Folder
                            SET 
                                Name = @name
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", folder.Name);
                    cmd.Parameters.AddWithValue("@id", folder.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void InsertIntoFolder(ImageFolder imf)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ImageFolder (ImageId, FolderId)
                                                       VALUES (@imageId, @folderId)";
                    cmd.Parameters.AddWithValue("@imageId", imf.ImageId);
                    cmd.Parameters.AddWithValue("@folderId", imf.FolderId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void RemoveFromFolder(ImageFolder imf)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM ImageFolder 
                                         WHERE ImageId = @imageId AND 
                                               FolderId = @folderId";
                    cmd.Parameters.AddWithValue("@imageId", imf.ImageId);
                    cmd.Parameters.AddWithValue("@folderId", imf.FolderId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
