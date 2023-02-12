import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CMessage } from "./types";

type ChatContextModel = {
  messages: CMessage[];
  ws?: WebSocket;
  sendMessage?: (userName: string, message: string) => void;
};

const ChatWsContext = createContext<ChatContextModel>({
  messages: [],
});

export const useChatWsContext = () => useContext(ChatWsContext);

export const ChatWsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<CMessage[]>([]);
  const wsClientRef = useRef<WebSocket>();

  useEffect(() => {
    wsClientRef.current = new WebSocket(`ws://localhost:3030/be/ws`);

    wsClientRef.current.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("Received message from server: ", data);
      setMessages((p) => [...p, data]);
    };
    return () => {
      wsClientRef.current?.close();
    };
  }, []);
  const sendMessage = useCallback((userName: string, message: string) => {
    const _message: CMessage = {
      message: message,
      type: "message",
      color: "tomato",
      user: {
        email: "bla",
        name: userName,
      },
    };
    wsClientRef.current?.send(JSON.stringify(_message));
  }, []);
  return (
    <ChatWsContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatWsContext.Provider>
  );
};
