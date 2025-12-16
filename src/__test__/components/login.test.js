import React from "react";
import { render, screen } from "@testing-library/react";

import Login from "../../components/auth/Login";
import { AuthProvider } from "../../context/AuthContext";

describe("Login Component", () => {
  test("should render login form", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });
});
