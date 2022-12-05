using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using SpriteZero.Repositories;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using SpriteZero.Models;
using SpriteZero.Repositories;


namespace SpriteZero
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(
                "GetByEmail",
                new { email = user.Email }, user);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(user);
            return NoContent();
        }
    }
}
