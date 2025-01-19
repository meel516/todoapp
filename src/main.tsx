import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { LoaderContextProvider } from "./hooks/useLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <LoaderContextProvider>
      <App />
    </LoaderContextProvider>
  </AuthContextProvider>,
);
