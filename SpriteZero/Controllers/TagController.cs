using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;
using System.Security.Claims;
using SpriteZero.Repositories;
using SpriteZero.Models;
using System;
using System.Collections.Generic;
using SpriteZero;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SpriteZero
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepo;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepo = tagRepository;

        }

        // GET: api/<TagController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepo.GetAllTags());
        }

        // GET api/<TagController>/5
        [HttpGet("{id}")]
        public IActionResult GetTagById(int id)
        {
            var tag = _tagRepo.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        // POST api/<TagController>
        [HttpPost]
        public IActionResult Add(Tag tag)
        {
            _tagRepo.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpPost("AddImageTag")]
        public IActionResult AddImageTag(ImageTag it)
        {
            _tagRepo.InsertTag(it);
            return Ok();
        }

        [HttpDelete("RemoveImageTag")]
        public IActionResult RemoveImageTag(ImageTag it)
        {
            _tagRepo.RemoveTag(it);
            return Ok();
        }

        [HttpGet("GetImageTags")]
        public IActionResult GetImageTags(int imageId)
        {            
            return Ok(_tagRepo.GetImageTags(imageId));
        }

        // PUT api/<TagController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, Tag tag)
        {
            _tagRepo.Update(tag);
            return Ok(tag);
        }

        // DELETE api/<TagController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepo.Delete(id);
            return NoContent();
        }
    }
}
