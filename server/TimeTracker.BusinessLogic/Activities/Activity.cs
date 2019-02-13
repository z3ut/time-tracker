using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Activities
{
    public class Activity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public DateTime DateTimeStart { get; set; }
        public DateTime? DateTimeEnd { get; set; }
    }
}
