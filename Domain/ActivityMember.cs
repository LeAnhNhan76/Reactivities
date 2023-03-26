using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain;

public class ActivityMember: IBaseEntity<Guid>, IAuditEntity<Guid> 
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid Id { get; set; }

    [Required]
    [ForeignKey("Activity")]
    public Guid ActivityId { get; set; }

    [Required]
    [ForeignKey("User")]
    public Guid MemberId { get; set; }

    [Required]
    public DateTime CreatedDate { get; set; }
    
    [Required]
    public Guid CreatedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public Guid ModifiedBy { get; set; }

    public virtual Activity Activity { get; set; }
    public virtual AppUser User { get; set; }
}