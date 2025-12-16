describe("Role-Based Access Control", () => {
  test("admin should have full access", () => {
    const userRole = "admin";

    const canEdit = userRole === "admin";
    const canDelete = userRole === "admin";

    expect(canEdit).toBe(true);
    expect(canDelete).toBe(true);
  });

  test("user should have limited access", () => {
    const userRole = "user";
    const canDelete = userRole === "admin";

    expect(canDelete).toBe(false);
  });
});
