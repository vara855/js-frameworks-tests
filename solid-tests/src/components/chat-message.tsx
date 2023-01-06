import { Component } from "solid-js";
import { CMessage } from "../types";

export type ChatMessageProps = {
  message: CMessage;
};

const ChatMessage: Component<ChatMessageProps> = ({ message }) => {
  console.log("Rendered message", message);
  return (
    <div class="chat-message">
      <span style={{ color: message.color }}>{message.user.name}</span>{" "}
      <span>{message.message}</span>
    </div>
  );
};

export default ChatMessage;
