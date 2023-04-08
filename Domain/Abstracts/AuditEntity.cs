using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Abstracts
{
    public abstract class AuditEntity: BaseEntity
    {
        [Required]
        public Guid CreatedBy { get; set; }
        [Required]
        public DateTimeOffset CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public DateTimeOffset? ModifiedDate { get; set; }
    }
}