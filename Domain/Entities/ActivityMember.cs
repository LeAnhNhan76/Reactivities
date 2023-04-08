using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Abstracts;

namespace Domain.Entities
{
    public class ActivityMember: AuditEntity 
    {
        [Required]
        [ForeignKey("Activity")]
        public Guid ActivityId { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid MemberId { get; set; }

        public virtual Activity Activity { get; set; }
        public virtual AppUser User { get; set; }
    }
}