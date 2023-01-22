import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
  useContext,
} from "solid-js";
import { checkThatBeWorks } from "./api/be-api";
import { ChatFooter } from "./components/chat-footer";
import ChatMessage from "./components/chat-message";
import { ChatWsContext } from "./contexts/chat-ws-context";

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
  let notReactiveScrollPaused = false;
  const [userName, setUserName] = createSignal<string>(
    `New User ${new Date().toLocaleTimeString()}`
  );
  const contextModel = useContext(ChatWsContext);
  console.log("contextModel :>> ", contextModel);

  createEffect(() => {
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
    return contextModel?.messages();
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
                  <button
                    onClick={() => {
                      setScrollPaused((v) => !v);
                      notReactiveScrollPaused = !notReactiveScrollPaused;
                    }}
                  >
                    {scrollPaused()
                      ? "Enable Auto-scroll"
                      : "Disable Auto-scroll"}
                  </button>
                </div>
              </div>
              <div class="chat" ref={chatContainerRef}>
                <For
                  each={contextModel?.messages()}
                  fallback={"no messages yet"}
                >
                  {(message) => <ChatMessage message={message} />}
                </For>
              </div>
              <div class="chat-controls">
                <ChatFooter userName={userName()} />
              </div>
            </>
          )}
        </Show>
      </div>
    </main>
  );
};

export default App;
