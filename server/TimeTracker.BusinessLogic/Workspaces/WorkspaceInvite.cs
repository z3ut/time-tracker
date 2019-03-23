using System;
using System.Collections.Generic;
using System.Text;
using TimeTracker.BusinessLogic.Users;

namespace TimeTracker.BusinessLogic.Workspaces
{
    public class WorkspaceInvite
    {
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
