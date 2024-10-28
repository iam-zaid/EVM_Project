using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EVMwithReact.Data;
using EVMwithReact.Data.Models;

namespace EVMwithReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfirmedDetailsController : ControllerBase
    {
        private readonly EVMwithReactContext _context;

        public ConfirmedDetailsController(EVMwithReactContext context)
        {
            _context = context;
        }

        // GET: api/ConfirmedDetails
        [HttpGet]
        public async Task<IActionResult> GetConfirmedDetails()
        {
            return _context.ConfirmedDetails != null ?
                    Ok(await _context.ConfirmedDetails.ToListAsync()) :
                    Problem("Entity set 'EVMwithReactContext.ConfirmedDetails' is null.");
        }

        // GET: api/ConfirmedDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConfirmedDetails(int id)
        {
            if (id < 1 || _context.ConfirmedDetails == null)
            {
                return BadRequest();
            }

            var confirmedDetails = await _context.ConfirmedDetails
                .FirstOrDefaultAsync(m => m.CDId == id);
            if (confirmedDetails == null)
            {
                return NotFound();
            }

            return Ok(confirmedDetails);
        }

        // POST: api/ConfirmedDetails
        [HttpPost]
        public async Task<IActionResult> PostConfirmedDetails([FromBody] ConfirmedDetails confirmedDetails)
        {
            if (confirmedDetails == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ConfirmedDetails.Add(confirmedDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConfirmedDetails), new { id = confirmedDetails.CDId }, confirmedDetails);
        }

        // PUT: api/ConfirmedDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConfirmedDetails(int id, [FromBody] ConfirmedDetails confirmedDetails)
        {
            if (id != confirmedDetails.CDId || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Entry(confirmedDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConfirmedDetailsExists(id))
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

        // DELETE: api/ConfirmedDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConfirmedDetails(int id)
        {
            if (id < 1 || _context.ConfirmedDetails == null)
            {
                return BadRequest();
            }

            var confirmedDetails = await _context.ConfirmedDetails.FindAsync(id);
            if (confirmedDetails == null)
            {
                return NotFound();
            }

            _context.ConfirmedDetails.Remove(confirmedDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConfirmedDetailsExists(int id)
        {
            return (_context.ConfirmedDetails?.Any(e => e.CDId == id)).GetValueOrDefault();
        }
    }
}
