import clsx from "clsx";
import { FC, memo } from "react";
import { CMessage } from "../types";

export type ChatMessageProps = {
  message: CMessage;
};

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  console.log("rendered message");
  return (
    <div
      className={clsx("chat-message", {
        ["chat-message__admin"]: message.type === "admin-message",
      })}
    >
      <span style={{ color: message.color }}>{message.user.name}</span>{" "}
      <span>{message.message}</span>
    </div>
  );
};

export default memo(ChatMessage);
