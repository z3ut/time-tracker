using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Text;
using TimeTracker.DataAccess.Models;

namespace TimeTracker.DataAccess
{
    public class ActivityContext : DbContext
    {
        public DbSet<Activity> Activities { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserWorkspace> UserWorkspaces { get; set; }
        public DbSet<UserSelectedWorkspace> UserSelectedWorkspaces { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Workspace> Workspaces { get; set; }
        public DbSet<WorkspaceInvite> WorkspaceInvites { get; set; }

        public ActivityContext(DbContextOptions<ActivityContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetUTCProperties(modelBuilder);
            SetModelRelations(modelBuilder);
            SetNotUpdatingProperties(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        private void SetUTCProperties(ModelBuilder modelBuilder)
        {
            // https://stackoverflow.com/a/50728577
            // read datetime in UTC
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                        property.SetValueConverter(dateTimeConverter);
                }
            }
        }

        private void SetModelRelations(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Workspace>()
                .HasOne<User>(w => w.User)
                .WithMany(w => w.WorkspacesOwned)
                .HasForeignKey(w => w.UserId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<UserSelectedWorkspace>()
                .HasKey(usw => new { usw.UserId, usw.WorkspaceId });

            modelBuilder.Entity<UserSelectedWorkspace>()
               .HasOne<Workspace>(w => w.Workspace)
               .WithMany(w => w.UserSelectedWorkspaces)
               .HasForeignKey(w => w.WorkspaceId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserSelectedWorkspace>()
               .HasOne<User>(u => u.User)
               .WithMany(u => u.UserSelectedWorkspace)
               .HasForeignKey(w => w.UserId)
               .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<UserWorkspace>()
                .HasKey(uw => new { uw.UserId, uw.WorkspaceId });

            modelBuilder.Entity<UserWorkspace>()
                .HasOne<User>(uw => uw.User)
                .WithMany(uw => uw.UserWorkspaces)
                .HasForeignKey(uw => uw.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserWorkspace>()
                .HasOne<Workspace>(uw => uw.Workspace)
                .WithMany(uw => uw.UserWorkspaces)
                .HasForeignKey(uw => uw.WorkspaceId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Activity>()
                .HasOne<Workspace>(a => a.Workspace)
                .WithMany(w => w.Activities)
                .HasForeignKey(a => a.WorkspaceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Project>()
                .HasOne<Workspace>(p => p.Workspace)
                .WithMany(w => w.Projects)
                .HasForeignKey(p => p.WorkspaceId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<WorkspaceInvite>()
                .HasOne<User>(wi => wi.Inviter)
                .WithMany(u => u.WorkspaceInviter)
                .HasForeignKey(ui => ui.InviterId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WorkspaceInvite>()
                .HasOne<User>(wi => wi.Recipient)
                .WithMany(u => u.WorkspaceInviteRecipient)
                .HasForeignKey(ui => ui.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private void SetNotUpdatingProperties(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Workspace>()
            //    .Property(e => e.DateTimeCreated)
            //    .ValueGeneratedOnAddOrUpdate()
            //    .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            //modelBuilder.Entity<Project>()
            //    .Property(e => e.DateTimeCreated)
            //    .ValueGeneratedOnAddOrUpdate()
            //    .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            modelBuilder.Entity<Workspace>()
                .Property(s => s.DateTimeCreated)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Project>()
                .Property(s => s.DateTimeCreated)
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
