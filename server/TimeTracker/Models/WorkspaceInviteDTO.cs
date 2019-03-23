using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTracker.Web.Models
{
    public class WorkspaceInviteDTO
    {
        public int Id { get; set; }
        public DateTime DateTimeCreated { get; set; }

        public UserInfoDTO Inviter { get; set; }
        public UserInfoDTO Recipient { get; set; }
        public WorkspaceDTO Workspace { get; set; }
    }
}
