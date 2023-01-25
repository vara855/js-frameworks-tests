<script setup lang="ts">
import {
  Fragment,
  onMounted,
  ref,
  onUnmounted,
  watchEffect,
  watch,
  provide,
  type Ref,
} from "vue";
import ChatMessage from "./components/ChatMessage.vue";
import ChatFooter from "./components/ChatFooter.vue";
import type { CMessage, SendMessage } from "./types";
import { useFetch } from "./utils/use-fetch";

const { data, error, loading } = useFetch("/be");
const messages = ref<CMessage[]>([]);
const chatContainerRef = ref<HTMLDivElement | null>(null);
const scrollPaused = ref<boolean>(false);
const userName = ref<string>("");

const scroll = (el: Element) => {
  if (!scrollPaused.value && el.parentElement) {
    console.log({ c: chatContainerRef.value });
    el.parentElement.scroll({
      top: el.parentElement.scrollHeight,
      behavior: "smooth",
    });
  }
};

let wsClientRef: WebSocket;

wsClientRef = new WebSocket(`ws://localhost:3030/be/ws`);
wsClientRef.onmessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);
  console.log("Received message from server: ", data);
  messages.value.push(data);
};

const sendMessage: SendMessage = (message: string) => {
  const _message: CMessage = {
    message: message,
    type: "message",
    color: "tomato",
    user: {
      email: "bla",
      name: userName.value,
    },
  };
  wsClientRef.send(JSON.stringify(_message));
};
provide<SendMessage>("sendMessage", sendMessage);

onUnmounted(() => {
  wsClientRef?.close();
});
</script>

<template>
  <main className="main">
    <div className="head">
      Vue js - Chat
      <div>{{ !error && "👌 Backend is OK!" }}</div>
      <!-- <div>{!beStatus.error && "👌 Backend is OK!"}</div> #}-->
    </div>
    <div className="content">
      <div v-if="loading">Loading</div>
      <template v-else>
        <div className="chat-header">
          <h2>Chat messages:</h2>
          <div className="chat-toolbar">
            <input
              v-mode="userName"
              className="chat-input"
              type="text"
              placeholder="User Name"
            />
            <button @click="scrollPaused = !scrollPaused">
              {{ scrollPaused ? "Enable Auto-scroll" : "Disable Auto-scroll" }}
            </button>
          </div>
        </div>
        <TransitionGroup tag="div" className="chat" @after-enter="scroll">
          <template v-for="(message, index) in messages" :key="index">
            <ChatMessage :message="message" />
          </template>
        </TransitionGroup>
        <div className="chat-controls">
          <ChatFooter />
        </div>
      </template>
    </div>
  </main>
</template>

<style module>
.myClass {
  background-color: tomato;
}
</style>
