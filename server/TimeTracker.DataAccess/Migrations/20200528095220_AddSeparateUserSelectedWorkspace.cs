using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeTracker.DataAccess.Migrations
{
    public partial class AddSeparateUserSelectedWorkspace : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Workspaces_SelectedWorkspaceId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_SelectedWorkspaceId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SelectedWorkspaceId",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "UserSelectedWorkspaces",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    WorkspaceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSelectedWorkspaces", x => new { x.UserId, x.WorkspaceId });
                    table.ForeignKey(
                        name: "FK_UserSelectedWorkspaces_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserSelectedWorkspaces_Workspaces_WorkspaceId",
                        column: x => x.WorkspaceId,
                        principalTable: "Workspaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_UserId",
                table: "Workspaces",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSelectedWorkspaces_WorkspaceId",
                table: "UserSelectedWorkspaces",
                column: "WorkspaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workspaces_Users_UserId",
                table: "Workspaces",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workspaces_Users_UserId",
                table: "Workspaces");

            migrationBuilder.DropTable(
                name: "UserSelectedWorkspaces");

            migrationBuilder.DropIndex(
                name: "IX_Workspaces_UserId",
                table: "Workspaces");

            migrationBuilder.AddColumn<int>(
                name: "SelectedWorkspaceId",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SelectedWorkspaceId",
                table: "Users",
                column: "SelectedWorkspaceId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Workspaces_SelectedWorkspaceId",
                table: "Users",
                column: "SelectedWorkspaceId",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
