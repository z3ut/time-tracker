using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.DataAccess.Models
{
	public class UserSelectedWorkspace
	{
		public int UserId { get; set; }
		public User User { get; set; }

		public int WorkspaceId { get; set; }
		public Workspace Workspace { get; set; }
	}
}
