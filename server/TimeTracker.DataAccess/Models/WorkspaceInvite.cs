using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TimeTracker.DataAccess.Models
{
    public class WorkspaceInvite
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime DateTimeCreated { get; set; }

        public int InviterId { get; set; }
        public User Inviter { get; set; }

        public int RecipientId { get; set; }
        public User Recipient { get; set; }

        public int WorkspaceId { get; set; }
        public Workspace Workspace { get; set; }
    }
}
