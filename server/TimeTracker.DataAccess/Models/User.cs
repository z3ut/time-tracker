using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TimeTracker.DataAccess.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public ICollection<Activity> Activities { get; set; }
        public ICollection<UserWorkspace> UserWorkspaces { get; set; }
        public ICollection<Workspace> WorkspacesOwned { get; set; }
        public ICollection<UserSelectedWorkspace> UserSelectedWorkspace { get; set; }

        public ICollection<WorkspaceInvite> WorkspaceInviter { get; set; }
        public ICollection<WorkspaceInvite> WorkspaceInviteRecipient { get; set; }
    }
}
