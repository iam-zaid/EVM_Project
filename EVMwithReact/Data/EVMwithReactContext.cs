using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;
using EVMwithReact.Data.Models;

namespace EVMwithReact.Data
{
    public class EVMwithReactContext : DbContext
    {
        public EVMwithReactContext (DbContextOptions<EVMwithReactContext> options)
            : base(options)
        {
        }

        public DbSet<EVMwithReact.Data.Models.User> Users { get; set; } = default!;
        public DbSet<EVMwithReact.Data.Models.Appointment> Appointments { get; set; }
        public DbSet<EVMwithReact.Data.Models.Transaction> Transactions { get; set; }
        public DbSet<EVMwithReact.Data.Models.ConfirmedDetails> ConfirmedDetails { get; set; }
        public DbSet<EVMwithReact.Data.Models.Payment> Payments { get; set; }
        public DbSet<EVMwithReact.Data.Models.Branch> Branches { get; set; }
        public DbSet<EVMwithReact.Data.Models.CheckUserLogin> CheckUserLogins { get; set; }
        public object Branch { get; internal set; }
    }
}
