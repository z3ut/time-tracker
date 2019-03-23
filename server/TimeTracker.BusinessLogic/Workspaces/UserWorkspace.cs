using System;
using System.Collections.Generic;
using System.Text;
using TimeTracker.BusinessLogic.Users;

namespace TimeTracker.BusinessLogic.Workspaces
{
    public class UserWorkspace
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int WorkspaceId { get; set; }
        public Workspace Workspace { get; set; }
    }
}
