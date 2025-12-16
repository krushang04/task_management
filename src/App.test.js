import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders task manager heading", () => {
  render(<App />);

  const headingElement = screen.getByText(/Task Manager/i, { selector: "h1, h2, h3, h4, h5, h6" });
  expect(headingElement).toBeInTheDocument();
});
