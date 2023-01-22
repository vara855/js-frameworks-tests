import { Component, createResource } from "solid-js";
import clsx from "clsx";
import { CMessage } from "../types";
import { checkThatBeWorks } from "../api/be-api";

export type ChatMessageProps = {
  message: CMessage;
};

const ChatMessage: Component<ChatMessageProps> = ({ message }) => {
  const [data] = createResource(checkThatBeWorks);
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
