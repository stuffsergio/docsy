import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sileo";
import ReactLenis from "lenis/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <>
            <Toaster
              position="bottom-center"
              options={{
                duration: 3000,
                fill: "#ffffff",
                styles: { description: "text-black/80!" },
              }}
            />
            <ReactLenis root>
              <App />
            </ReactLenis>
          </>
        </AnimatePresence>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
