using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class AppUser : IBaseEntity<Guid>, IAuditEntity<Guid>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid Id { get; set; }

    [Required]
    [Column(TypeName = "VARCHAR")]
    [StringLength(200)]
    public string UserName { get; set;}

    [Required]
    public string Password { get; set;}

    [Required]
    public string PasswordSalt { get; set;}
    
    [Required]
    [StringLength(100)]
    public string FirstName { get; set; }
    
    [StringLength(100)]
    public string LastName { get; set; }

    [StringLength(200)]
    public string NickName { get; set; }

    [Required]
    [Column(TypeName = "VARCHAR")]
    public string Email { get; set; }

    public DateTime BirthDate { get; set; }

    [Required]
    public DateTime CreatedDate { get; set; }

    [Required]
    public Guid CreatedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public Guid ModifiedBy { get; set; }
}