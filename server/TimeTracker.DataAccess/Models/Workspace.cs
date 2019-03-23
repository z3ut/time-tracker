using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TimeTracker.DataAccess.Models
{
    public class Workspace
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateTimeCreated { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Activity> Activities { get; set; }
        public ICollection<Project> Projects { get; set; }
        public ICollection<UserWorkspace> UserWorkspaces { get; set; }
        public ICollection<WorkspaceInvite> WorkspaceInvites { get; set; }
    }
}
