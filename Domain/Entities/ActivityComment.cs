using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Abstracts;

namespace Domain.Entities
{
    public class ActivityComment : AuditEntity
    {
        [Required]
        
        [ForeignKey("Activity")]
        public Guid ActivityId { get; set;}

        [Required]
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        [ForeignKey("CommentStatus")]
        public byte Status { get; set;}

        [Required]
        public Guid CreatedBy { get; set; }

        public Guid? ModifiedBy { get; set; }

        public virtual Activity Activity { get; set;}
        public virtual AppUser User { get; set; }
        public virtual ActivityCommentStatus CommentStatus { get; set; }
    }
}