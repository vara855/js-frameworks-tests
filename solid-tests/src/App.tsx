import {
  Component,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  onCleanup,
  Show,
} from "solid-js";
import ChatMessage from "./components/chat-message";
import { CMessage } from "./types";

const checkThatBeWorks = async (): Promise<{ health: string }> => {
  const resp = await fetch("/be");
  if (resp.ok) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return resp.json();
  } else {
    throw new Error("BE is not available");
  }
};

const ErrorRenderer: Component<{ error: any }> = ({ error }) => {
  return (
    <span style={{ color: "tomato" }}>{error.message ?? "unknown error"}</span>
  );
};
const App: Component = () => {
  let chatContainerRef:
    | HTMLDivElement
    | ((el: HTMLDivElement) => void)
    | undefined;

  const [data] = createResource(checkThatBeWorks);
  const [scrollPaused, setScrollPaused] = createSignal<boolean>(false);
  const [userName, setUserName] = createSignal<string>(
    `New User ${new Date().toLocaleTimeString()}`
  );
  const [chatInput, setChatInput] = createSignal<string>("");
  const [messages, setMessages] = createSignal<CMessage[]>();
  const wsClient = createMemo(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");
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

  const handleSend = () => {
    const message: CMessage = {
      message: chatInput(),
      type: "message",
      color: "tomato",
      user: {
        email: "bla",
        name: userName(),
      },
    };
    wsClient().send(JSON.stringify(message));
    setChatInput("");
  };

  createEffect(() => {
    console.log(chatContainerRef);
    if (
      !scrollPaused() &&
      chatContainerRef &&
      typeof chatContainerRef !== "function"
    ) {
      chatContainerRef.scroll({
        top: chatContainerRef.scrollHeight,
        behavior: "smooth",
      });
    }
    return messages();
  });

  return (
    <main class="main">
      <div class="head">
        Solid js - Chat <div>{!data.error && "👌 Backend is OK!"}</div>
      </div>
      <div class="content">
        <Show when={!data.loading} fallback={<div>Loading...</div>}>
          {data.error ? (
            <div>
              Failed to fetch BE heath: <ErrorRenderer error={data.error} />
            </div>
          ) : (
            <>
              <div class="chat-header">
                <h2>Chat messages:</h2>
                <div class="chat-toolbar">
                  <input
                    value={userName()}
                    onChange={(e: any) => {
                      setUserName(e.target.value);
                    }}
                    class="chat-input"
                    type="text"
                    placeholder="User Name"
                  />
                  <button onClick={() => setScrollPaused((v) => !v)}>
                    {scrollPaused()
                      ? "Enable Auto-scroll"
                      : "Disable Auto-scroll"}
                  </button>
                </div>
              </div>
              <div class="chat" ref={chatContainerRef}>
                <For each={messages()} fallback={"no messages yet"}>
                  {(message) => <ChatMessage message={message} />}
                </For>
              </div>
              <div class="chat-controls">
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
              </div>
            </>
          )}
        </Show>
      </div>
    </main>
  );
};

export default App;
