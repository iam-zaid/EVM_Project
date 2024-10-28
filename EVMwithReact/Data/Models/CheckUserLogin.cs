using System;
using System.ComponentModel.DataAnnotations;

namespace EVMwithReact.Data.Models
{
	public class CheckUserLogin
	{
        [Key]
        public int checkUserLoginId { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
    }
}

