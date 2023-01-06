import { Component } from "solid-js";

export type ChatMessageProps = {
  message: {
    message: string;
    color: string;
    user: {
      name: string;
      email: string;
    };
  };
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
