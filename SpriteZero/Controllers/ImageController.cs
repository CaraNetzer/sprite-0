using System;
using Microsoft.AspNetCore.Mvc;
using SpriteZero;
using SpriteZero.Models;
using Microsoft.Extensions.Hosting;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SpriteZero
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;
        public ImageController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_imageRepository.GetAll());
        }

        //[HttpGet("{id}")]
        //public IActionResult GetById(int id)
        //{
        //    var post = _imageRepository.GetById(id);
        //    if (post == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(post);
        //}

        //[HttpGet("GetUserImagesById")]
        //public IActionResult GetUserImagesById(int id)
        //{
        //    var posts = _imageRepository.GetByUser(id);
        //    return Ok(posts);
        //}

        //[HttpPost]
        //public IActionResult Post(Image image)
        //{
        //    _imageRepository.Insert(image);
        //    return CreatedAtAction("Get", new { id = image.Id }, image);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Image image)
        //{
        //    if (id != image.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _imageRepository.Update(image);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _imageRepository.Delete(id);
        //    return NoContent();
        //}

        //[HttpGet("search")]
        //public IActionResult Search(string q, bool sortDesc)
        //{
        //    return Ok(_imageRepository.Search(q, sortDesc));
        //} 
    }
}
