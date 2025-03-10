import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Ensure the publishable key exists
if (!clerkPubKey) {
  throw new Error("Clerk publishable key is missing!");
}

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the app with ClerkProvider */}
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <App />
      </Router>
    </ClerkProvider>
  </StrictMode>
);
