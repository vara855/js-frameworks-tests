import {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import { useChatWsContext } from "./chat-ws-context";
import { ChatFooter } from "./components/chat-footer";
// import ChatMessage from "./components/chat-message";
import { useFetch } from "./useFetch";
import ChatMessageSvelte from "./components/ChatMessage.svelte";
import { ChatMessageProps } from "./components/ChatMessage.props";

// 1) Create root node -> render
// 2) Create component factory -> Create ref for components render place -> render components if Root is mounted.
// 3) Create Island (Common Root) -> ... Factory ... Builder ... SLOT ... -> On one level of that common root render anything

function SvelteWrapper<P>(SvelteComponent: any, target?: HTMLElement): FC<P> {
  const Component: FC<any> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
      const instance = new SvelteComponent({
        target: target ?? containerRef.current,
        props: props,
      });

      return () => {
        instance.$destroy();
      };
    }, []);

    if (target) {
      return null;
    } else {
      return <div ref={containerRef} />;
    }
  };
  return Component;
}

type SvelteSuspenseProps = {
  fallback?: ReactNode;
};
const SvelteSuspense: FC<PropsWithChildren<SvelteSuspenseProps>> = ({
  children,
  fallback,
}) => {
  if (!children) {
    return <>{fallback ?? null}</>;
  }
  return <>{children}</>;
};

function App() {
  const beStatus = useFetch("/be");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string>(
    () => `User - ${new Date().toLocaleTimeString()}`
  );
  const [scrollPaused, setScrollPaused] = useState<boolean>();
  const contextModel = useChatWsContext();
  const ChatMessage = useMemo(() => {
    if (chatContainerRef.current) {
      return SvelteWrapper<ChatMessageProps>(
        ChatMessageSvelte,
        chatContainerRef.current
      );
    }
  }, [chatContainerRef.current]);
  useEffect(() => {
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
                <SvelteSuspense fallback={"Loading..."}>
                  {ChatMessage && <ChatMessage key={idx} message={it} />}
                </SvelteSuspense>
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
