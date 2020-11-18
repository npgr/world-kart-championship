import React from "react";
import { screen } from "@testing-library/react";
import { renderWithIntl as render } from "./utils/test-utils";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import ROUTES from "./routes";
import App from "./App";

const history = createBrowserHistory();

const renderApp = () =>
  render(
    <Router history={history}>
      <App />
    </Router>
  );

test("Not found page", async () => {
  history.push("nonexistent-url");
  renderApp();

  const lazyPageContent = await screen.findByText(/Not Found page/i);
  expect(lazyPageContent).toBeInTheDocument();
});

test("Show Home page", async () => {
  history.push(ROUTES.HOME);
  renderApp();

  const lazyPageContent = await screen.findByText(/Home page/i);
  expect(lazyPageContent).toBeInTheDocument();
});
