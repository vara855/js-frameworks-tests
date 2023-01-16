import { FC, useState } from "react";
import { useChatWsContext } from "../chat-ws-context";

type ChatFooterProps = {
  userName: string;
};

export const ChatFooter: FC<ChatFooterProps> = ({ userName }) => {
  const [chatInput, setChatInput] = useState<string>("");
  const contextModel = useChatWsContext();
  const handleSend = () => {
    contextModel?.sendMessage?.(userName, chatInput);
    setChatInput("");
  };
  return (
    <>
      <input
        value={chatInput}
        onChange={(e: any) => {
          setChatInput(e.target.value);
        }}
        className="chat-input"
        type="text"
        placeholder="Type Your Message"
      />
      <button onClick={handleSend}>Send</button>
    </>
  );
};
