<script lang="ts" setup>
import { defineProps } from "vue";
import type { CMessage } from "../types";
const props = defineProps<{ message: CMessage }>();
</script>

<template>
  <div class="chat-message">
    <span v-bind:style="{ color: message.color }">{{ message.user.name }}</span>
    <span>{{ message.message }}</span>
  </div>
</template>

<style lang="css"></style>
