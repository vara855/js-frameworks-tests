export type MessageType = "message" | "admin-message" | string;

export type CMessage = {
  message: string;
  type: MessageType;
  color: string;
  user: {
    name: string;
    email: string;
  };
};
export type SendMessage = (m: string) => void;