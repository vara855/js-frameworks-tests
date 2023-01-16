import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useChatWsContext } from "./chat-ws-context";
import { ChatFooter } from "./components/chat-footer";
import ChatMessage from "./components/chat-message";
import { useFetch } from "./useFetch";

function App() {
  const beStatus = useFetch("/be");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string>(
    () => `User - ${new Date().toLocaleTimeString()}`
  );
  const [scrollPaused, setScrollPaused] = useState<boolean>();
  const contextModel = useChatWsContext();

  useEffect(() => {
    console.log();
    if (
      !scrollPaused &&
      chatContainerRef &&
      typeof chatContainerRef !== "function"
    ) {
      chatContainerRef.current?.scroll({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [contextModel.messages]);

  return (
    <main className="main">
      <div className="head">
        React js - Chat
        <div>{!beStatus.error && "👌 Backend is OK!"}</div>
      </div>
      <div className="content">
        {beStatus.isLoading && <div>Loading...</div>}
        {!beStatus.isLoading && (
          <>
            <div className="chat-header">
              <h2>Chat messages:</h2>
              <div className="chat-toolbar">
                <input
                  value={userName}
                  onChange={(e: any) => {
                    setUserName(e.target.value);
                  }}
                  className="chat-input"
                  type="text"
                  placeholder="User Name"
                />
                <button onClick={() => setScrollPaused((v) => !v)}>
                  {scrollPaused ? "Enable Auto-scroll" : "Disable Auto-scroll"}
                </button>
              </div>
            </div>
            <div className="chat" ref={chatContainerRef}>
              {contextModel.messages.map((it, idx) => (
                <ChatMessage key={idx} message={it} />
              ))}
            </div>
            <div className="chat-controls">
              <ChatFooter userName={userName} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
