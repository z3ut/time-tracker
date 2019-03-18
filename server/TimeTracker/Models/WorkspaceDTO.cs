using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTracker.Web.Models
{
    public class WorkspaceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public int UserId { get; set; }
    }
}
