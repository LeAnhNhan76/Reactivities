using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Abstracts;

namespace Domain.Entities
{
    public class Activity: AuditEntity
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; }
        
        public string Description { get; set; }

        [StringLength(200)]
        public string Category { get; set; }

        public DateTime Date { get; set; }

        [StringLength(1000)]
        public string City { get; set; }

       [StringLength(1000)] 
        public string Venue { get; set; }

        public Guid? HostId { get; set; }

        [Required]
        [ForeignKey("ActivityStatus")]
        public byte Status { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        public Guid? ModifiedBy { get; set; }

        public virtual ActivityStatus ActivityStatus { get; set; }
    }
}