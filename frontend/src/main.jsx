import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SkeletonTheme
          baseColor="rgba(21, 42, 37, 0.07)"
          highlightColor="rgba(21, 42, 37, 0.13)"
        >
          <App />
          <Toaster
            position="top-right"
            gutter={10}
            toastOptions={{
              duration: 2800,
              className: "app-toast",
              success: {
                className: "app-toast app-toast-success",
                iconTheme: {
                  primary: "rgb(18, 41, 35)",
                  secondary: "rgb(255, 255, 255)",
                },
              },
              error: {
                className: "app-toast app-toast-error",
              },
            }}
          />
        </SkeletonTheme>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
