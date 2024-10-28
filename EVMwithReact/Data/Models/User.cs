using System;
using System.ComponentModel.DataAnnotations;

namespace EVMwithReact.Data.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public string UserName { get; set; }
        
        public string Email { get; set; }
        
        public string PhoneNo { get; set; }
        
        public string City { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public string PostalCode { get; set; }

        public string Password { get; set; }


        // Added fields based on checking validations

    }
}