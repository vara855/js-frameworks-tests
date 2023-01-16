import {
  Accessor,
  Component,
  createContext,
  createMemo,
  createSignal,
  onCleanup,
  ParentComponent,
} from "solid-js";
import { CMessage } from "../types";

type ChatWsContextModel = {
  ws: Accessor<WebSocket>;

  messages: Accessor<CMessage[]>;

  sendMessage?: (userName: string, message: string) => void;
};
export const ChatWsContext = createContext<ChatWsContextModel>(undefined, {
  name: "chatWsContext",
});

export const ChatWsContextProvider: ParentComponent = (props) => {
  const [messages, setMessages] = createSignal<CMessage[]>([]);
  const wsClient = createMemo(() => {
    const ws = new WebSocket("ws://localhost:3030/be/ws");
    console.log("createMemo");
    onCleanup(() => {
      console.log("cleanup");
      ws.close();
    });
    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("Received message from server: ", data);
      setMessages((p = []) => [...p, data]);
    };
    return ws;
  });

  const sendMessage = (userName: string, message: string) => {
    const _message: CMessage = {
      message: message,
      type: "message",
      color: "tomato",
      user: {
        email: "bla",
        name: userName,
      },
    };
    wsClient().send(JSON.stringify(_message));
  };
  return (
    <ChatWsContext.Provider value={{ messages, ws: wsClient, sendMessage }}>
      {props.children}
    </ChatWsContext.Provider>
  );
};
