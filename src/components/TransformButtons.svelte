<script lang="ts">
  import { getJsonFromWorkspace, loadJsonToWorkspace } from '../lib/blockly';
  import {
    getActiveTab,
    getEditorState,
    type Lang,
    type Tab,
  } from '../lib/lang';
  import { jsToBlocks, type Program } from 'gimblocks';
  import { clearErrors, showError } from '../lib/error';

  export let tabs: Record<Lang, Tab>;

  function transform() {
    let tab = tabs['js'];
    if (tab.tag != 'active') return;
    let blocks: Program;
    try {
      blocks = jsToBlocks(getEditorState(tab.editor).doc.toString());
    } catch (e) {
      showError(tab, e);
      tabs = tabs;
      return;
    }
    clearErrors(tab);
    tabs = tabs;
    loadJsonToWorkspace(blocks);
  }

  function replace() {
    let tab = tabs['json'];
    if (tab.tag != 'active') return;
    let blocks: Program;
    try {
      blocks = JSON.parse(getEditorState(tab.editor).doc.toString());
    } catch (e) {
      showError(tab, e);
      tabs = tabs;
      return;
    }
    clearErrors(tab);
    tabs = tabs;
    loadJsonToWorkspace(blocks);
  }

  function load() {
    const tab = tabs['json'];
    if (tab.tag != 'active') return;
    const editor = tab.editor;
    if (editor.tag != 'awake') return;

    const json = getJsonFromWorkspace();
    const newCode = JSON.stringify(json, null, 2);
    editor.view.dispatch({
      changes: {
        from: 0,
        to: getEditorState(tab.editor).doc.length,
        insert: newCode,
      },
    });
    tabs = tabs;
  }

  function clear() {
    let activeTab = getActiveTab(tabs);
    if (activeTab == null) return;
    clearErrors(activeTab);
    tabs = tabs;
  }
</script>

<div class="scroll">
  <div class="top">
    <div class="left">
      {#if tabs['json'].tag == 'active'}
        <button on:click={replace}>to blocks</button>
        <button on:click={load}>from blocks</button>
      {/if}
      {#if tabs['js'].tag == 'active'}
        <button on:click={transform}>to blocks</button>
      {/if}
    </div>
    <div class="right">
      <button on:click={clear}>clear errors</button>
    </div>
  </div>
</div>

<style>
  div.scroll {
    width: 100%;
    overflow-x: auto;
    position: relative;
    padding: var(--pad);
  }
  div.top {
    width: 100%;
    height: auto;
    overflow: auto;
    display: flex;
    flex-direction: row;
    gap: var(--pad);
    justify-content: space-between;
  }
  div.left,
  div.right {
    display: flex;
    flex-direction: row;
    gap: var(--pad);
  }

  button {
    background: var(--back-2);
    color: var(--text);
    padding: var(--pad);
    font-size: var(--font-size-small);
    border-radius: var(--rad);
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    white-space: nowrap;
  }
  button:hover {
    background: var(--back-3);
  }

  button:active {
    background: var(--back-4);
  }
</style>
