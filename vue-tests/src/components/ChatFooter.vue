<script lang="ts" setup>
import { inject, ref } from "vue";
import type { SendMessage } from "../types";

const sendMessage = inject<SendMessage>("sendMessage");
const chatInput = ref<string>("");
const _sendMessage = sendMessage ?? (() => null);
</script>

<template>
  <input
    v-model="chatInput"
    className="chat-input"
    type="text"
    placeholder="Type Your Message"
  />
  <button @click="() => _sendMessage(chatInput)">Send</button>
</template>
