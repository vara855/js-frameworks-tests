<script lang="ts" setup>
import { inject, ref } from "vue";
import type { SendMessage } from "../types";

const sendMessage = inject<SendMessage>("sendMessage") ?? (() => null);
const chatInput = ref("");
</script>

<template>
  <input
    v-model="chatInput"
    class="chat-input"
    type="text"
    placeholder="Type Your Message"
  />
  <button @click="sendMessage(chatInput)">Send</button>
</template>
