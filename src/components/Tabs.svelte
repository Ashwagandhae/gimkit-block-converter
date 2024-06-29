<script lang="ts">
  import { type Lang, langs, type Tab, activateTab } from '../lib/lang';

  export let tabs: Record<Lang, Tab>;
</script>

<div class="top">
  {#each langs as lang}
    <button
      class:active={tabs[lang].tag == 'active'}
      on:click={async () => {
        tabs = activateTab(tabs, lang);
      }}>{lang}</button
    >
  {/each}
</div>

<style>
  .top {
    display: flex;
    flex-direction: column;
    gap: var(--pad);
  }

  button {
    background: var(--back-1);
    color: var(--text);
    padding: var(--pad);
    border-radius: var(--rad);
    font-size: var(--font-size);
    border: none;
    cursor: pointer;
  }

  button.active {
    background: var(--back-2);
    color: var(--text-strong);
  }

  button:hover {
    background: var(--back-2);
  }

  button:active {
    background: var(--back-3);
  }
</style>
