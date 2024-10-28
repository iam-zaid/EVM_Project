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
    public class PaymentController : ControllerBase
    {
        private readonly EVMwithReactContext _context;

        public PaymentController(EVMwithReactContext context)
        {
            _context = context;
        }

        // GET: api/Payment
        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            return _context.Payments != null ?
                    Ok(await _context.Payments.ToListAsync()) :
                    Problem("Entity set 'EVMwithReactContext.Payments' is null.");
        }

        // GET: api/Payment/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayment(int id)
        {
            if (id < 1 || _context.Payments == null)
            {
                return BadRequest();
            }

            var payment = await _context.Payments
                .FirstOrDefaultAsync(m => m.PaymentId == id);
            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }

        // POST: api/Payment
        [HttpPost]
        public async Task<IActionResult> PostPayment([FromBody] Payment payment)
        {
            if (payment == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayment), new { id = payment.PaymentId }, payment);
        }

        // PUT: api/Payment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(int id, [FromBody] Payment payment)
        {
            if (id != payment.PaymentId || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
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

        // DELETE: api/Payment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            if (id < 1 || _context.Payments == null)
            {
                return BadRequest();
            }

            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentExists(int id)
        {
            return (_context.Payments?.Any(e => e.PaymentId == id)).GetValueOrDefault();
        }
    }
}
