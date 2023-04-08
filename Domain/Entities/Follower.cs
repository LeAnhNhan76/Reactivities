using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Abstracts;

namespace Domain.Entities
{
    public class Follower : AuditEntity
    {
        [Required]
        [ForeignKey("UserFollower"), Column(Order = 0)]
        public Guid FollowerId { get; set; }

        [Required]
        [ForeignKey("UserFollowing"), Column(Order = 1)]
        public Guid FollowingId { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        public Guid? ModifiedBy { get; set; }        

        public virtual AppUser UserFollower { get; set; }
        public virtual AppUser UserFollowing { get; set; }
    }
}