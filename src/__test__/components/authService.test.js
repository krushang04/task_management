import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";

describe("Authentication Service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should login successfully", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      const response = await result.current.login("testuser", "password", "user");
      expect(response.success).toBe(true);
    });
  });
});
