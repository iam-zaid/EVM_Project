using System;
using System.ComponentModel.DataAnnotations;
namespace EVMwithReact.Data.Models
{
	public class Transaction
	{
		public int TransactionId { get; set; }

		public string userId { get; set; }	//Id of the user started the transaction
		public string paymentId { get; set; }//Id of the payment
		public DateTime date { get; set; }

        public Boolean status { get; set; }
	}
}

