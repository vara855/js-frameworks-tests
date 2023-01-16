import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatWsContextProvider } from "./chat-ws-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChatWsContextProvider>
      <App />
    </ChatWsContextProvider>
  </React.StrictMode>
);
