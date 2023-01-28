<script lang="ts">
  import type { CMessage } from "../app-types";

  console.log("RENDER MESSAGE");
  export let message: CMessage;
  export let onCustomHover: () => void = undefined;
</script>

<div on:mouseenter={onCustomHover} class="chat-message">
  <span style:color={message.color}>{message.user.name}</span>
  <span>{message.message}</span>
</div>
