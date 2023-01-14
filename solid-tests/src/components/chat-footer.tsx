import { Component, createSignal, mergeProps, useContext } from "solid-js";
import { ChatWsContext } from "../contexts/chat-ws-context";

type ChatFooterProps = {
  userName: string;
};

export const ChatFooter: Component<ChatFooterProps> = (props) => {
  const [chatInput, setChatInput] = createSignal<string>("");
  const contextModel = useContext(ChatWsContext);
  const handleSend = () => {
    contextModel?.sendMessage?.(props.userName, chatInput());
    setChatInput("");
  };
  return (
    <>
      <input
        value={chatInput()}
        onChange={(e: any) => {
          setChatInput(e.target.value);
        }}
        class="chat-input"
        type="text"
        placeholder="Type Your Message"
      />
      <button onClick={handleSend}>Send</button>
    </>
  );
};
