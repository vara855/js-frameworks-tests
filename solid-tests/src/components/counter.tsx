import { Component, createSignal } from "solid-js";

const Counter: Component = () => {
  const [count, setCount] = createSignal<number>(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <span>{count()}</span>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
};

export default Counter;
