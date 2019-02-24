using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Projects
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public int UserId { get; set; }
    }
}
