<script lang="ts">
  import { langs, type Lang, type Tab } from '../lib/lang';
  import CodeEditor from './CodeEditor.svelte';
  import Message from './Message.svelte';
  import TransformButtons from './TransformButtons.svelte';

  export let tabs: Record<Lang, Tab>;

  $: currentLang = langs.find((lang) => tabs[lang].tag == 'active');
</script>

<div class="top">
  {#if currentLang != null}
    <div class="scroll">
      {#key currentLang}
        <CodeEditor bind:editor={tabs[currentLang].editor}></CodeEditor>
      {/key}
      <Message bind:message={tabs[currentLang].message}></Message>
    </div>
  {/if}
  <TransformButtons bind:tabs></TransformButtons>
</div>

<style>
  div.scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
  }
  .top {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    border-radius: var(--rad);
    background: var(--back-1);
  }
</style>
