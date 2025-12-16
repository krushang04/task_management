import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../context/AuthContext";
import TaskList from "../../components/tasks/TaskList";

describe("TaskList Component", () => {
  test("should render loading state initially", () => {
    render(
      <AuthProvider>
        <TaskList />
      </AuthProvider>
    );

    expect(screen.getByText("Loading tasks...")).toBeInTheDocument();
  });
});
