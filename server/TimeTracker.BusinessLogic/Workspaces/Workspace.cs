using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Workspaces
{
    public class Workspace
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public int UserId { get; set; }
    }
}
