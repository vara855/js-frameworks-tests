/* @refresh reload */
import { render } from "solid-js/web";

import "./index.scss";
import App from "./App";
import { ChatWsContextProvider } from "./contexts/chat-ws-context";

render(
  () => (
    <ChatWsContextProvider>
      <App />
    </ChatWsContextProvider>
  ),
  document.getElementById("root") as HTMLElement
);
