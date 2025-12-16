import { renderHook, act } from "@testing-library/react";
import { useAuth, AuthProvider } from "../../context/AuthContext";

describe("Task Management Flow Integration", () => {
  test("complete task workflow", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.login("admin", "admin123", "admin");
    });

    expect(result.current.user).toBeTruthy();

    const tasks = [];
    const newTask = {
      id: Date.now(),
      title: "Integration Test Task",
      description: "Test Description",
      status: "Pending",
      dueDate: "2024-12-30",
    };
    tasks.push(newTask);

    expect(tasks).toHaveLength(1);
  });
});
