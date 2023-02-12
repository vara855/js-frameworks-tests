<script lang="ts">
  import type { CMessage } from "../types";
  console.log("RENDER MESSAGE");
  export let message: CMessage;
</script>

<div class="chat-message">
  <span style:color={message.color}>{message.user.name}</span>
  <span>{message.message}</span>
</div>
