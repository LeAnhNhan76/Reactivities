using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ActivityCommentStatus: IStatusEntity 
{
    [Key]
    public byte Id {get;set;}

    [Required]
    [Column(TypeName = "VARCHAR")]
    [StringLength(50)]
    public string Name {get;set;}
}