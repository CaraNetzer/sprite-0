using SpriteZero.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using SpriteZero.Models;
using SpriteZero.Tests.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace SpriteZero.Tests
{
    public class ImageControllerTests
    {
        [Fact]
        public void Get_Returns_All_Images()
        {
            // Arrange 
            var imageCount = 20;
            var images = CreateTestImages(imageCount);

            var repo = new InMemoryImageRepository(images);
            var controller = new ImageController(repo);

            // Act 
            var result = controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualImages = Assert.IsType<List<Image>>(okResult.Value);

            Assert.Equal(imageCount, actualImages.Count);
            Assert.Equal(images, actualImages);
        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_id()
        {
            // Arrange 
            var posts = new List<Image>(); // no posts

            var repo = new InMemoryImageRepository(posts);
            var controller = new ImageController(repo);

            // Act
            var result = controller.GetById(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Get_By_Id_Returns_Post_With_Given_Id()
        {
            // Arrange
            var testPostId = 99;
            var posts = CreateTestImages(5);
            posts[0].Id = testPostId; // Make sure we know the Id of one of the posts

            var repo = new InMemoryImageRepository(posts);
            var controller = new ImageController(repo);

            // Act
            var result = controller.GetById(testPostId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualPost = Assert.IsType<Image>(okResult.Value);

            Assert.Equal(testPostId, actualPost.Id);
        }

        [Fact]
        public void Post_Method_Adds_A_New_Post()
        {
            // Arrange 
            var postCount = 20;
            var posts = CreateTestImages(postCount);

            var repo = new InMemoryImageRepository(posts);
            var controller = new ImageController(repo);

            // Act
            Random random = new();
            var newImage = new Image()
            {
                Src = $"http://post.image.url/",
                Title = $"Title",
                Notes = $"Notes",
                Width = random.Next(1, 401),
                Height = random.Next(1, 401),
                Sheet = random.Next(1, 3) == 1,
                Upvotes = random.Next(1, 22),
                Artist = $"Artist",
                User = CreateTestUser(999),
                UserId = 999
            };

            controller.Post(newImage);

            // Assert
            Assert.Equal(postCount + 1, repo.InternalData.Count);
        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Do_Not_Match()
        {
            // Arrange
            var testPostId = 99;
            var posts = CreateTestImages(5);
            posts[0].Id = testPostId; // Make sure we know the Id of one of the posts

            var repo = new InMemoryImageRepository(posts);
            var controller = new ImageController(repo);

            Random random = new();
            var postToUpdate = new Image()
            {
                Id = testPostId,
                Src = $"http://post.image.url/",
                Title = $"Title",
                Notes = $"Notes",
                Width = random.Next(1, 401),
                Height = random.Next(1, 401),
                Sheet = random.Next(1, 3) == 1,
                Upvotes = random.Next(1, 22),
                Artist = $"Artist",
                User = CreateTestUser(999),
                UserId = 999
            };
            var someOtherPostId = testPostId + 1; // make sure they aren't the same

            // Act
            var result = controller.Put(someOtherPostId, postToUpdate);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Put_Method_Updates_A_Post()
        {
            // Arrange
            var testPostId = 99;
            var posts = CreateTestImages(5);
            posts[0].Id = testPostId; // Make sure we know the Id of one of the posts

            var repo = new InMemoryImageRepository(posts);
            var controller = new ImageController(repo);

            Random random = new();
            var postToUpdate = new Image()
            {
                Id = testPostId,
                Src = $"http://post.image.url/",
                Title = $"Title",
                Notes = $"Notes",
                Width = random.Next(1, 401),
                Height = random.Next(1, 401),
                Sheet = random.Next(1, 3) == 1,
                Upvotes = random.Next(1, 22),
                Artist = $"Artist",
                User = CreateTestUser(999),
                UserId = 999
            };

            // Act
            controller.Put(testPostId, postToUpdate);

            // Assert
            var postFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testPostId);
            Assert.NotNull(postFromDb);

            Assert.Equal(postToUpdate.Src, postFromDb.Src);
            Assert.Equal(postToUpdate.Title, postFromDb.Title);
            Assert.Equal(postToUpdate.Notes, postFromDb.Notes);
            Assert.Equal(postToUpdate.Width, postFromDb.Width);
            Assert.Equal(postToUpdate.Height, postFromDb.Height);
            Assert.Equal(postToUpdate.Sheet, postFromDb.Sheet);
            Assert.Equal(postToUpdate.Upvotes, postFromDb.Upvotes);
            Assert.Equal(postToUpdate.Artist, postFromDb.Artist);
            Assert.Equal(postToUpdate.UserId, postFromDb.UserId);

        }

        [Fact]
        public void Delete_Method_Removes_A_Post()
        {
            // Arrange
            var testPostId = 99;
            var posts = CreateTestImages(5);
            posts[0].Id = testPostId; // Make sure we know the Id of one of the posts

            var repo = new InMemoryImageRepository(posts);
            var controller = new ImageController(repo);

            // Act
            controller.Delete(testPostId);

            // Assert
            var postFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testPostId);
            Assert.Null(postFromDb);
        }

        private List<Image> CreateTestImages(int count)
        {
            var images = new List<Image>();
            Random random = new Random();
            for (var i = 1; i <= count; i++)
            {
                images.Add(new Image()
                {
                    Id = i,
                    Src = $"http://post.image.url/{i}",
                    Title = $"Title {i}",
                    Notes = $"Notes {i}",
                    Width = random.Next(1, 401),
                    Height = random.Next(1, 401),
                    Sheet = random.Next(1,3) == 1,
                    Upvotes = random.Next(1, 22),
                    Artist = $"Artist {i}",
                    User = CreateTestUser(i),
                    UserId = i
                });
            }
            return images;
        }

        private User CreateTestUser(int id)
        {
            return new User()
            {
                Id = id,
                Username = $"User {id}",
                Email = $"user{id}@example.com"
            };
        }
    }
}
