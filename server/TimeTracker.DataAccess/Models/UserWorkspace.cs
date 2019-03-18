using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.DataAccess.Models
{
    public class UserWorkspace
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int WorkspaceId { get; set; }
        public Workspace Workspace { get; set; }
    }
}
