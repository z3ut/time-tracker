using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Users.Passwords
{
    public interface IPasswordService
    {
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        bool IsPasswordHashValid(string password, byte[] hash, byte[] salt);
    }
}
