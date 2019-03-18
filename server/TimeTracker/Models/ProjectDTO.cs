using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTracker.Web.Models
{
    public class ProjectDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public int UserId { get; set; }
        public int WorkspaceId { get; set; }
    }
}
