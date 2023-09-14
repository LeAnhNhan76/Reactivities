using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Abstracts
{
    public abstract class StatusEntity: BaseEntityIdentity<byte>
    {
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        public string Name {get;set;}
    }
}