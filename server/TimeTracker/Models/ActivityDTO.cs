using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTracker.Web.Models
{
    public class ActivityDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WorkspaceId { get; set; }
        public int? ProjectId { get; set; }
        public string Title { get; set; }
        public DateTime DateTimeStart { get; set; }
        public DateTime? DateTimeEnd { get; set; }
    }
}
