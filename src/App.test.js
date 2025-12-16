// src/App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders task manager heading", () => {
  render(<App />);
  // Look for any heading that contains "Task Manager"
  const headingElement = screen.getByText(/Task Manager/i, { selector: "h1, h2, h3, h4, h5, h6" });
  expect(headingElement).toBeInTheDocument();
});
