﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TimeTracker.DataAccess.Models
{
    public class Activity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DateTimeStart { get; set; }
        public DateTime? DateTimeEnd { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int WorkspaceId { get; set; }
        public Workspace Workspace { get; set; }

        public int? ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
