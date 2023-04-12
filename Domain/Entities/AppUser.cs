using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Abstracts;

namespace Domain.Entities
{
    public class AppUser : AuditEntity
    {
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(200)]
        public string UserName { get; set;}

        [Required]
        public byte[] Password { get; set;}

        [Required]
        public byte[] PasswordSalt { get; set;}
        
        [StringLength(100)]
        public string FirstName { get; set; }
        
        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(200)]
        public string NickName { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(320)]
        public string Email { get; set; }

        public DateTime? BirthDate { get; set; }

        [NotMapped]
        public string DisplayName
        {
          get 
          {
            if (!string.IsNullOrEmpty(NickName)) return NickName;

            if (string.IsNullOrEmpty(FirstName) && string.IsNullOrEmpty(LastName)) return Email;

            return string.Concat(FirstName, " ", LastName);
          }
        }
    }
}