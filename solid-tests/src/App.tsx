import { Component, createResource, Show } from "solid-js";

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

const ws = new WebSocket("ws://localhost:3000/ws");
console.log({ ws });
const App: Component = () => {
  const [data] = createResource(checkThatBeWorks);
  console.log("data.error :>> ", data.error);
  return (
    <>
      <Show when={!data.loading} fallback={<div>Loading...</div>}>
        {data.error ? (
          <div>
            Failed to fetch BE heath: <ErrorRenderer error={data.error} />
          </div>
        ) : (
          <h1>Hello</h1>
        )}
      </Show>
    </>
  );
};

export default App;
