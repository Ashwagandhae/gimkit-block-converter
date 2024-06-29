<script lang="ts">
  import View from './View.svelte';
  import { initTabs, type Lang, type Tab } from '../lib/lang';
  import Tabs from './Tabs.svelte';
  import Resize from './Resize.svelte';

  export let wrapperDiv: HTMLElement;

  let tabs: Record<Lang, Tab> = initTabs();

  let minimized = GL.storage.getValue('BlockConverter', 'minimized', false);

  function setMinimized(value: boolean) {
    minimized = value;
    GL.storage.setValue('BlockConverter', 'minimized', value);
  }
</script>

{#if minimized}
  <main class="minimized">
    <button class="minimize" on:click={() => setMinimized(false)}>max</button>
  </main>
{:else}
  <main>
    <div class="sidebar">
      <Tabs bind:tabs></Tabs>
      <button class="minimize" on:click={() => setMinimized(true)}>min</button>
    </div>
    <View bind:tabs></View>
  </main>
  <Resize element={wrapperDiv} />
{/if}

<style>
  main {
    --back-0: hsl(220, 13%, 13%);
    --back-1: hsl(220, 13%, 18%);
    --back-2: hsl(220, 13%, 24%);
    --back-3: hsl(220, 13%, 31%);
    --back-4: hsl(220, 13%, 39%);
    --back-5: hsl(220, 13%, 48%);

    --back-err-0: hsl(0, 40%, 13%);
    --back-err-1: hsl(0, 40%, 18%);
    --back-err-2: hsl(0, 40%, 24%);
    --back-err-3: hsl(0, 40%, 31%);
    --back-err-4: hsl(0, 40%, 39%);
    --back-err-5: hsl(0, 40%, 48%);

    --text: hsl(0, 0%, 85%);
    --text-strong: hsl(0, 0%, 100%);
    --text-weak: hsl(0, 0%, 70%);

    --text-err: hsl(0, 100%, 80%);
    --text-err-strong: hsl(0, 100%, 90%);
    --text-err-weak: hsl(0, 75%, 70%);

    --font-size: 14px;
    --font-size-small: 12px;

    --pad: 6px;
    --pad-small: 3px;
    --rad: 8px;
  }
  main {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--back-0);
    border-radius: var(--rad);

    pointer-events: auto;

    display: flex;
    flex-direction: row;
  }
  main.minimized {
    bottom: 0px;
    left: 0px;
    position: absolute;
    width: min-content;
    height: min-content;
    padding: var(--pad);
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--pad);
    padding: var(--pad);
    justify-content: space-between;
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
  button:hover {
    background: var(--back-2);
  }

  button:active {
    background: var(--back-3);
  }
</style>
