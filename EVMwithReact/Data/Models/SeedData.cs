using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using EVMwithReact.Data;
using EVMwithReact.Data.Models;
using System.ComponentModel.Design;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new EVMwithReactContext(
            serviceProvider.GetRequiredService<DbContextOptions<EVMwithReactContext>>()))
        {
            // Check if there is any existing data
            if (context.Appointments.Any())
            {
                return;   // Data is already seeded
            }

            // Seed sample data
            var branch1 = new Branch { BranchName = "Branch A", Address = "123 street", PostalCode = "2314", Phone = "9876543210", City = "MInin", State = "MH", Email = "jklsja@jdklj.com" };
            var  branch2 = new Branch { BranchName = "Branch B", Address = "Robie street", PostalCode = "B45JKL", Phone = "0987654321", City = "Halifax", State = "NS", Email = "dbherjge" };
            var comp3 = new Branch { BranchName = "The Zaid Shaikh Branch", Address = "Lower Water Str", PostalCode = "B3J 1S5", Phone = "9877899870", City = "Halifax", State = "NS", Email = "zaidsh@comapny.com" };

            context.Branches.AddRange(branch1, branch2);

            //context.SaveChanges();

            var companyId = comp3.BranchId; // Assuming comp3 is an instance of Company with a valid CompanyId

            //List<Appointment> appointments = new List<Appointment>();
            //for (int i = 0; i < 15; i++)
            //{
            //    var appointment = new Appointment
            //    {
            //        AppointmentDate = DateTime.Now.Date.AddDays(i * 2), // Adjust the date logic as needed
            //        AppointmentTime = new TimeSpan(6, 30, 0),
            //        BranchId = companyId
            //    };

            //    appointments.Add(appointment);
            //}
            //context.Appointments.AddRange(appointments);

            context.SaveChanges();
        }
    }
}
