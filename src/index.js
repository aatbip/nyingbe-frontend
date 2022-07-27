import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { AppProvider } from "./contexts/appContexts/app.context";
import { UserDashboardProvider } from "./contexts/userDashboardContexts/userDashboard.context";
import "./style.global.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppProvider>
      <UserDashboardProvider>
        <App />
      </UserDashboardProvider>
    </AppProvider>
  </StrictMode>
);
