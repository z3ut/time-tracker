using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Users
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public int SelectedWorkspaceId { get; set; }
    }
}
