import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app/App";
import ToastNotifications from "./components/toast-notifications";
import { CharacterProvider } from "./context/character";
import { NotificationsProvider } from "./context/notifications";

import "./index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationsProvider>
        <CharacterProvider>
          <App />
        </CharacterProvider>
        <ToastNotifications />
      </NotificationsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
