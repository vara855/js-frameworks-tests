import { Component } from "solid-js";
import clsx from "clsx";
import { CMessage } from "../types";

export type ChatMessageProps = {
  message: CMessage;
};

const ChatMessage: Component<ChatMessageProps> = ({ message }) => {
  return (
    <div
      class={clsx("chat-message", {
        ["chat-message__admin"]: message.type === "admin-message",
      })}
    >
      <span style={{ color: message.color }}>{message.user.name}</span>{" "}
      <span>{message.message}</span>
    </div>
  );
};

export default ChatMessage;
