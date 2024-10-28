//Change Log:
//Changed the Model Name to Branch.
//
//

using System;
using System.ComponentModel.DataAnnotations;
namespace EVMwithReact.Data.Models
{
    public class Branch
    {
        public int BranchId { get; set; }

        public string BranchName { get; set; }
        
        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string PostalCode { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }
    }
}