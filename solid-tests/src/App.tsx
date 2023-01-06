import {
  Component,
  createMemo,
  createResource,
  createSignal,
  For,
  onCleanup,
  Show,
} from "solid-js";
import ChatMessage from "./components/chat-message";

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
  const [data] = createResource(checkThatBeWorks);
  const [messages, setMessages] = createSignal<any[]>();
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

  return (
    <>
      <div class="head">Solid js - Chat</div>
      <div class="content">
        <Show when={!data.loading} fallback={<div>Loading...</div>}>
          {data.error ? (
            <div>
              Failed to fetch BE heath: <ErrorRenderer error={data.error} />
            </div>
          ) : (
            <>
              <p>Backend is ready 👌</p>
              <h2>Chat messages:</h2>
              <div class="chat">
                <For each={messages()} fallback={"no messages yet"}>
                  {(message) => <ChatMessage message={message} />}
                </For>
              </div>
            </>
          )}
        </Show>
      </div>
    </>
  );
};

export default App;
