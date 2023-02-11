<script lang="ts" setup>
import { defineProps } from "vue";
import type { CMessage } from "../types";

const props = defineProps<{ message: CMessage }>();
</script>

<template>
  <div class="chat-message">
    <span :style="{ color: props.message.color }">
      {{ props.message.user.name }}
    </span>
    <span>
      {{ props.message.message }}
    </span>
  </div>
</template>
