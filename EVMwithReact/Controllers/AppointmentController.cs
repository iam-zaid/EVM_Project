using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EVMwithReact.Data.Models;
using EVMwithReact.Data;
using Microsoft.EntityFrameworkCore;

namespace EVMwithReact.Controllers
{
    [Route("api/[controller]")]
    public class AppointmentController : Controller
    {
        private readonly EVMwithReactContext  _context;

        public AppointmentController(EVMwithReactContext context)
        {
            _context = context;
        }

        // GET: api/Appointment
        [HttpGet]
        public async Task<IActionResult> GetAppointments()
        {
            return Ok(await _context.Appointments.ToListAsync());
        }

        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }

        // PUT: api/Appointment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment([FromRoute] int id, [FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appointment.AppointmentId)
            {
                return BadRequest();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
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

        // POST: api/Appointment
        [HttpPost]
        public async Task<IActionResult> PostAppointment([FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.AppointmentId }, appointment);
        }

        // DELETE: api/Appointment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return Ok(appointment);
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(e => e.AppointmentId == id);
        }
    }
}