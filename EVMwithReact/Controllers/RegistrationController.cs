using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EVMwithReact.Data;
using EVMwithReact.Data.Models;
using Microsoft.IdentityModel.Tokens;

namespace EVMwithReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly EVMwithReactContext _context;

        public RegistrationController(EVMwithReactContext context)
        {
            _context = context;
        }

        // GET: api/Registration
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return _context.Users != null ?
                    Ok(await _context.Users.ToListAsync()) :
                    Problem("Entity set 'EVMwithReactContext.User' is null.");
        }

        // GET: api/Registration/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (id < 1 || _context.Users == null)
            {
                return BadRequest();
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        // GET: api/Registration/CheckUser
        [HttpPost("CheckUser")]
        public async Task<IActionResult> CheckUser(CheckUserLogin checkUser)
        {
            if (checkUser == null || !ModelState.IsValid)
            {
                return BadRequest("Username and password are required");
            }

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == checkUser.Email && u.Password == checkUser.Password);

            if (existingUser != null)
            {
                // User with the given username and password exists
                return Ok("User exists");
            }

            // User does not exist, you can return a success response or any other appropriate response
            return NotFound("User does not exist");
        }

        // POST: api/Registration
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (user == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var checkUserLogins = new CheckUserLogin
            {
                Email = user.Email,
                Password = user.Password
                // You can add other fields as needed
            };

            _context.CheckUserLogins.Add(checkUserLogins);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
        }

        // PUT: api/Registration/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromBody] User user)
        {
            if (id != user.UserId || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Registration/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id < 1 || _context.Users == null)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
