<script lang="ts">
  import type { Message } from '../lib/message';

  export let message: Message | null;
</script>

{#if message != null}
  <div class="top" class:error={message?.severity == 'error'}>
    <div class="content">
      {#if message?.title != null}
        <span class="title">
          {message.title}
        </span>
      {/if}
      {message.text}
    </div>
  </div>
{/if}

<style>
  .top {
    width: 100%;
    padding: var(--pad);
    padding-bottom: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
  }

  .content {
    width: 100%;
    color: var(--text);
    padding: var(--pad);
    background: var(--back-2);
    box-sizing: border-box;
    border-radius: var(--rad);
    font-size: var(--font-size);
  }

  span.title {
    font-weight: bold;
    color: var(--text-strong);
    background: var(--back-3);
    border-radius: var(--rad);
    padding: 0 var(--pad);
  }

  .error span.title {
    background: var(--back-err-3);
    color: var(--text-err-strong);
  }

  .error .content {
    background: var(--back-err-2);
    color: var(--text-err);
  }
</style>
