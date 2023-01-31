<script lang="ts">
  import { api } from "../App.svelte";


  let chatInput = "";

  const handleSend = () => {
    api.sendMessage(chatInput, userName);
    chatInput = "";
  }
  export let userName: string;
</script>

<input
  bind:value={chatInput}
  class="chat-input"
  type="text"
  placeholder="Type Your Message"
/>
<button on:click={handleSend}>Send</button>
