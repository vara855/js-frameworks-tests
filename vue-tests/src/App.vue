<script setup lang="ts">
import { Fragment, onMounted, ref, onUnmounted, watchEffect, watch } from "vue";
import ChatMessage from "./components/ChatMessage.vue";
import type { CMessage } from "./types";
import { useFetch } from "./utils/use-fetch";

const { data, error, loading } = useFetch("/be");
const messages = ref<CMessage[]>([]);
const chatContainerRef = ref<HTMLDivElement | null>(null);
const scrollPaused = ref<boolean>(false);

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
            <button @click="scrollPaused = !scrollPaused">
              {{ scrollPaused ? "Enable Auto-scroll" : "Disable Auto-scroll" }}
            </button>
          </div>
        </div>
        <TransitionGroup
          tag="div"
          className="chat"
          @after-enter="scroll"
          ref="(el) => el"
        >
          <template v-for="(message, index) in messages" :key="index">
            <ChatMessage :message="message" />
          </template>
        </TransitionGroup>
      </template>
    </div>
  </main>
</template>

<style module>
.myClass {
  background-color: tomato;
}
</style>
