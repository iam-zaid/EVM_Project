using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace EVMwithReact.Data.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public string TypeOfCreditCard { get; set; }

        public string CardNumber { get; set; }

        public string ExpirationDate { get; set; }

        public string EmailAddress { get; set; }

        public string userId { get; set; }  //Id of the user who made the payment
    }

}

