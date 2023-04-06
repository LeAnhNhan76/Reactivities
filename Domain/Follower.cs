using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Follower : IBaseEntity<Guid>, IAuditEntity<Guid>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid Id { get; set; }

    [Required]
    [ForeignKey("UserFollower"), Column(Order = 0)]
    public Guid FollowerId { get; set; }

    [Required]
    [ForeignKey("UserFollowing"), Column(Order = 1)]
    public Guid FollowingId { get; set; }

    [Required]
    public DateTime CreatedDate { get; set; }

    [Required]
    public Guid CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public virtual AppUser UserFollower { get; set; }
    public virtual AppUser UserFollowing { get; set; }
}