import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProfilesProvider } from "./ContextAPI/ProfilesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProfilesProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ProfilesProvider>
  </React.StrictMode>
);
