import React from "react";
import { render, screen } from "@testing-library/react";

import Home from "./Home";

test("renders home", () => {
  render(<Home />);
  const homeMessage = screen.getByText(/Home page/i);

  expect(homeMessage).toBeInTheDocument();
});
