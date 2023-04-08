using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Abstracts
{
    public abstract class AuditEntity<T>: BaseEntity<T> where T: struct
    {
        [Required]
        public T CreatedBy { get; set; }

        [Required]
        public DateTimeOffset CreatedDate { get; set; }

        public T? ModifiedBy { get; set; }
        public DateTimeOffset ModifiedDate { get; set; }
    }
}