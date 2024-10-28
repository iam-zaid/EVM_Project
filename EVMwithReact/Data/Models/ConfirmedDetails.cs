using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EVMwithReact.Data.Models
{
	public class ConfirmedDetails
	{
		[Key]
		public int CDId { get; set; } //To store the unique id

        public string userId { get; set; } //id of the current User

        public string appointmentId { get; set; }	// id of the selected appointment
	}
}

