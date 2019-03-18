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

        public int SelectedWorkspaceId { get; set; }
        [ForeignKey(nameof(SelectedWorkspaceId))]
        public Workspace SelectedWorkspace { get; set; }

        public ICollection<Activity> Activities { get; set; }
        public ICollection<UserWorkspace> UserWorkspaces { get; set; }
    }
}
