﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TimeTracker.DataAccess;

namespace TimeTracker.DataAccess.Migrations
{
    [DbContext(typeof(ActivityContext))]
    [Migration("20190320180920_AddWorkspaceInvites")]
    partial class AddWorkspaceInvites
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TimeTracker.DataAccess.Models.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("DateTimeEnd");

                    b.Property<DateTime>("DateTimeStart");

                    b.Property<int?>("ProjectId");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.Property<int>("WorkspaceId");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("UserId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Color");

                    b.Property<DateTime>("DateTimeCreated");

                    b.Property<string>("Name");

                    b.Property<int>("UserId");

                    b.Property<int>("WorkspaceId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<int>("SelectedWorkspaceId");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("SelectedWorkspaceId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.UserWorkspace", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("WorkspaceId");

                    b.HasKey("UserId", "WorkspaceId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("UserWorkspaces");
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.Workspace", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTimeCreated");

                    b.Property<string>("Name");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Workspaces");
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.WorkspaceInvite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTimeCreated");

                    b.Property<int>("InviterId");

                    b.Property<int>("RecipientId");

                    b.Property<int>("WorkspaceId");

                    b.HasKey("Id");

                    b.HasIndex("InviterId");

                    b.HasIndex("RecipientId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("WorkspaceInvites");
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.Activity", b =>
                {
                    b.HasOne("TimeTracker.DataAccess.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");

                    b.HasOne("TimeTracker.DataAccess.Models.User", "User")
                        .WithMany("Activities")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TimeTracker.DataAccess.Models.Workspace", "Workspace")
                        .WithMany("Activities")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.Project", b =>
                {
                    b.HasOne("TimeTracker.DataAccess.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TimeTracker.DataAccess.Models.Workspace", "Workspace")
                        .WithMany("Projects")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.User", b =>
                {
                    b.HasOne("TimeTracker.DataAccess.Models.Workspace", "SelectedWorkspace")
                        .WithOne("User")
                        .HasForeignKey("TimeTracker.DataAccess.Models.User", "SelectedWorkspaceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.UserWorkspace", b =>
                {
                    b.HasOne("TimeTracker.DataAccess.Models.User", "User")
                        .WithMany("UserWorkspaces")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TimeTracker.DataAccess.Models.Workspace", "Workspace")
                        .WithMany("UserWorkspaces")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("TimeTracker.DataAccess.Models.WorkspaceInvite", b =>
                {
                    b.HasOne("TimeTracker.DataAccess.Models.User", "Inviter")
                        .WithMany("WorkspaceInviter")
                        .HasForeignKey("InviterId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TimeTracker.DataAccess.Models.User", "Recipient")
                        .WithMany("WorkspaceInviteRecipient")
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("TimeTracker.DataAccess.Models.Workspace", "Workspace")
                        .WithMany("WorkspaceInvites")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
