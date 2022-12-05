using System;
using System.Collections.Generic;
using System.Security.Policy;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SpriteZero.Models;
using System.Linq;
using Microsoft.Extensions.Hosting;
using SpriteZero;

namespace SpriteZero
{
    public class PostRepository : BaseRepository, IImageRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Image> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,
                                            p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId,

                                            c.name as CategoryName, u.DisplayName
                                        FROM Post p
                                        join category c on p.categoryId = c.id
                                        join userProfile u on p.userProfileId = u.id
                                        where p.IsApproved = 1 and p.publishDateTime < @now
                                        order by p.publishDateTime desc;";

                    cmd.Parameters.AddWithValue("now", DateTime.Now);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Post> posts = new List<Post>();
                    while (reader.Read())
                    {
                        Post post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                            PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            UserProfile = new UserProfile(),
                            Category = new Category()
                        };
                        post.UserProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
                        post.Category.Name = reader.GetString(reader.GetOrdinal("CategoryName"));

                        posts.Add(post);
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        //public Post GetById(int id)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT p.id as PostId, p.Title, p.Content, p.ImageLocation, p.PublishDateTime, p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId, c.name as CategoryName, u.DisplayName, t.Id as TagId, t.Name
        //        FROM Post p
        //        left join category c on p.categoryId = c.id
        //        left join userProfile u on p.userProfileId = u.id
        //        left join PostTag pt on p.Id = pt.PostId
        //        left join Tag t on pt.TagId = t.Id
        //        where p.id = @id";
        //            cmd.Parameters.AddWithValue("id", id);
        //            SqlDataReader reader = cmd.ExecuteReader();

        //            Post post = null;

        //            while (reader.Read())
        //            {
        //                if (post == null)
        //                {

        //                    post = new Post()
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("PostId")),
        //                        Title = reader.GetString(reader.GetOrdinal("Title")),
        //                        Content = reader.GetString(reader.GetOrdinal("Content")),
        //                        ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
        //                        PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
        //                        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //                        IsApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
        //                        CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
        //                        UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //                        UserProfile = new UserProfile(),
        //                        Category = new Category()
        //                    };
        //                    post.UserProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
        //                    post.Category.Name = reader.GetString(reader.GetOrdinal("CategoryName"));
        //                }

        //                if (DbUtils.IsNotDbNull(reader, "TagId") && !post.Tags.Any(x => x.Id == DbUtils.GetNullableInt(reader, "TagId")))
        //                {
        //                    post.Tags.Add(new Tag
        //                    {
        //                        Id = DbUtils.GetInt(reader, "TagId"),
        //                        Name = DbUtils.GetString(reader, "Name")
        //                    });
        //                }


        //            }

        //            reader.Close();

        //            return post;
        //        }
        //    }
        //}

        //public List<Post> GetByUser(int userId)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT p.id, p.Title, p.Content, p.ImageLocation, p.PublishDateTime,
        //                                    p.CreateDateTime, p.isApproved, p.categoryId, p.userProfileId,

        //                                    c.name as CategoryName, u.DisplayName
        //                                FROM Post p
        //                                join category c on p.categoryId = c.id
        //                                join userProfile u on p.userProfileId = u.id
        //                                where p.IsApproved = 1 and p.publishDateTime < @now and p.userProfileId = @id
        //                                order by p.publishDateTime desc;";
        //            cmd.Parameters.AddWithValue("now", DateTime.Now);
        //            cmd.Parameters.AddWithValue("id", userId);
        //            SqlDataReader reader = cmd.ExecuteReader();

        //            List<Post> posts = new List<Post>();
        //            while (reader.Read())
        //            {
        //                Post post = new Post()
        //                {
        //                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                    Title = reader.GetString(reader.GetOrdinal("Title")),
        //                    Content = reader.GetString(reader.GetOrdinal("Content")),
        //                    ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
        //                    PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime")),
        //                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //                    IsApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
        //                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
        //                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
        //                    UserProfile = new UserProfile(),
        //                    Category = new Category()
        //                };
        //                post.UserProfile.DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"));
        //                post.Category.Name = reader.GetString(reader.GetOrdinal("CategoryName"));

        //                posts.Add(post);
        //            }

        //            reader.Close();

        //            return posts;
        //        }
        //    }
        //}

        //public void Insert(Post post)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                INSERT INTO Post (
        //                    Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
        //                    IsApproved, CategoryId, UserProfileId )
        //                OUTPUT INSERTED.ID
        //                VALUES (
        //                    @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
        //                    @IsApproved, @CategoryId, @UserProfileId )";
        //            cmd.Parameters.AddWithValue("@Title", post.Title);
        //            cmd.Parameters.AddWithValue("@Content", post.Content);
        //            cmd.Parameters.AddWithValue("@ImageLocation", post.ImageLocation);
        //            cmd.Parameters.AddWithValue("@CreateDateTime", DateTime.Now);

        //            //when the user does not enter a date, the fetch call sends post.PublishDateTime as "1/1/1000..." which C# 
        //            //doesn't recognize
        //            //when a user doesn't enter a publication date, I'm interpretting that they want it published immediately
        //            object published = post.PublishDateTime < DateTime.Parse("1/1/1753") ? DateTime.Now : post.PublishDateTime;

        //            DbUtils.AddParameter(cmd, "@PublishDateTime", published);

        //            cmd.Parameters.AddWithValue("@IsApproved", true);
        //            cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
        //            cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

        //            post.Id = (int)cmd.ExecuteScalar();
        //        }
        //    }
        //}

        //public void Delete(int id)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = "DELETE FROM Post WHERE id = @id";
        //            cmd.Parameters.AddWithValue("@id", id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void Update(Post post)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        {
        //            using (SqlCommand cmd = conn.CreateCommand())
        //            {
        //                cmd.CommandText = @"UPDATE Post
        //                                        SET Title = @title, 
        //                                            Content = @content, 
        //                                            ImageLocation = @imageLocation, 
        //                                            CreateDateTime = @createDateTime, 
        //                                            PublishDateTime = @publishDateTime,
        //                                            IsApproved = @isApproved, 
        //                                            CategoryId = @categoryId, 
        //                                            UserProfileId = @userProfileId
        //                                        WHERE id  = @id";

        //                cmd.Parameters.AddWithValue("@id", post.Id);
        //                cmd.Parameters.AddWithValue("@title", post.Title);
        //                cmd.Parameters.AddWithValue("@content", post.Content);
        //                cmd.Parameters.AddWithValue("@imageLocation", post.ImageLocation);
        //                cmd.Parameters.AddWithValue("@createDateTime", DateTime.Now);
        //                cmd.Parameters.AddWithValue("@isApproved", true);
        //                cmd.Parameters.AddWithValue("@categoryId", post.CategoryId);
        //                cmd.Parameters.AddWithValue("@userProfileId", post.UserProfileId);

        //                object published = post.PublishDateTime < DateTime.Parse("1/1/1753") ? DateTime.Now : post.PublishDateTime;
        //                DbUtils.AddParameter(cmd, "@PublishDateTime", published);

        //                cmd.ExecuteNonQuery();
        //            }
        //        }
        //    }
        //}

        //public void InsertTag(Post post, Tag tag)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId)
        //                                               VALUES (@postId, @tagId)";
        //            cmd.Parameters.AddWithValue("@postId", post.Id);
        //            cmd.Parameters.AddWithValue("@tagId", tag.Id);
        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void DeleteTag(int postId, int tagId)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"DELETE FROM PostTag 
        //                                 WHERE PostId = @postId AND 
        //                                       TagId = @tagId";
        //            cmd.Parameters.AddWithValue("@postId", postId);
        //            cmd.Parameters.AddWithValue("@tagId", tagId);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}
    }
}