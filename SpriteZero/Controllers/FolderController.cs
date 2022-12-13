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
    public class FolderController : ControllerBase
    {
        private readonly IFolderRepository _folderRepo;

        public FolderController(IFolderRepository folderRepository)
        {
            _folderRepo = folderRepository;

        }

        // GET: api/<FolderController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_folderRepo.GetAllFolders());
        }

        [HttpGet("GetByUser")]
        public IActionResult GetByUser(int userId)
        {
            return Ok(_folderRepo.GetAllFoldersByUser(userId));
        }

        // GET api/<FolderController>/5
        [HttpGet("{id}")]
        public IActionResult GetFolderById(int id)
        {
            var folder = _folderRepo.GetFolderById(id);
            if (folder == null)
            {
                return NotFound();
            }
            return Ok(folder);
        }

        // POST api/<FolderController>
        [HttpPost]
        public IActionResult Add(Folder folder)
        {
            _folderRepo.Add(folder);
            return CreatedAtAction("Get", new { id = folder.Id }, folder);
        }

        [HttpPost("AddToImageFolder")]
        public IActionResult AddIntoImageFolder(ImageFolder it)
        {
            _folderRepo.InsertIntoFolder(it);
            return Ok();
        }

        [HttpDelete("RemoveFromImageFolder")]
        public IActionResult RemovefromImageFolder(ImageFolder it)
        {
            _folderRepo.RemoveFromFolder(it);
            return Ok();
        }

        [HttpGet("GetImageFolders")]
        public IActionResult GetImageFolders(int imageId)
        {
            return Ok(_folderRepo.GetImageFolders(imageId));
        }

        [HttpGet("GetFolderImages")]
        public IActionResult GetFolderImages(int folderId)
        {
            return Ok(_folderRepo.GetFolderImages(folderId));
        }

        // PUT api/<FolderController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, Folder folder)
        {
            _folderRepo.Update(folder);
            return Ok(folder);
        }

        // DELETE api/<FolderController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _folderRepo.Delete(id);
            return NoContent();
        }
    }
}