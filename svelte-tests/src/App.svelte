<!-- That's not really good way to do that. But it's just a first attempt to UNDERSTEND SVELTE.  -->
<script context="module" lang="ts">
  import type { CMessage } from "./app-types";
  const messagesStore = writable<CMessage[]>([]);
  let wsClientRef = new WebSocket("ws://localhost:3030/be/ws");
  wsClientRef.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    // console.log("Received message from server: ", data);
    messagesStore.update((prev) => {
      prev.push(data);
      return prev;
    });
    // messagesStore.set([...messagesStore.]);
  };

  export const api = {
    close: () => {
      wsClientRef.close();
    },
    sendMessage: (message: any) => {
      wsClientRef.send(JSON.stringify(message));
    },
  };
</script>

<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte";
  import { readable, writable } from "svelte/store";
  import ChatMessage from "./lib/ChatMessage.svelte";

  let scrollPaused = false;
  let status = {
    isLoading: false,
    response: undefined,
    error: undefined,
  };
  let chatDivElement: HTMLDivElement;
  let messages: CMessage[] = [];
  const fetchBeStatus = async () => {
    status.isLoading = true;
    const res = await fetch("/be");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const json = await res.json();
    status.isLoading = false;
    status.response = json;
    // return res.json();
  };

  const reorderInRandom = () => {
    messages = messages.sort(() => Math.random());
  };
  const autoScroll = () => {
    if (chatDivElement && !scrollPaused && messages.length) {
      chatDivElement.scroll({
        top: chatDivElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  $: {
    afterUpdate(() => {
      if (chatDivElement && !scrollPaused && messages.length) {
        chatDivElement.scroll({
          top: chatDivElement.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }
  messagesStore.subscribe((_messages) => {
    messages = _messages;
    autoScroll();
  });
  console.log("messages :>> ");
  onDestroy(() => {
    wsClientRef.close();
  });
  fetchBeStatus();
</script>

<main class="main">
  <div class="head">
    Svelte js - Chat
    {#if status.isLoading}
      <div>Loading..</div>
    {:else}
      <div>{!status.error && "👌 Backend is OK!"}</div>
    {/if}
  </div>
  <div class="content">
    {#if status.isLoading}
      Loading...
    {:else}
      <div class="chat-header">
        <h2>Chat messages:</h2>
        <div class="chat-toolbar">
          <input class="chat-input" type="text" placeholder="User Name" />
          <button on:click={() => reorderInRandom()}>Reorder in random</button>
          <button on:click={() => (scrollPaused = !scrollPaused)}>
            {scrollPaused ? "Enable Auto-scroll" : "Disable Auto-scroll"}
          </button>
        </div>
      </div>
      <div class="chat" bind:this={chatDivElement}>
        {#each messages as message}
          <ChatMessage
            onCustomHover={() => console.log("Blur event accurse ")}
            {message}
          />
        {/each}
      </div>
    {/if}
    <!-- <div v-if="loading">Loading</div>
    <template v-else>
      <div class="chat-header">
        <h2>Chat messages:</h2>
        <div class="chat-toolbar">
          <input
            v-mode="userName"
            class="chat-input"
            type="text"
            placeholder="User Name"
          />
          <button @click="scrollPaused = !scrollPaused">
            {{ scrollPaused ? "Enable Auto-scroll" : "Disable Auto-scroll" }}
          </button>
        </div>
      </div>
      <TransitionGroup tag="div" class="chat" @after-enter="scroll">
        <template v-for="(message, index) in messages" :key="index">
          <ChatMessage :message="message" />
        </template>
      </TransitionGroup>
      <div class="chat-controls">
        <ChatFooter />
      </div>
    </template> -->
  </div>
</main>

<style>
</style>
