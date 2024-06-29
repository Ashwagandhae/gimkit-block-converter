<script lang="ts">
  import { EditorView } from '@codemirror/view';

  import { onMount } from 'svelte';
  import type { Editor } from '../lib/lang';

  export let editor: Editor;

  let contentEl: HTMLElement | null = null;

  onMount(() => {
    if (editor.tag == 'awake') {
      let view = editor.view;
      editor = { tag: 'asleep', state: view.state };
      view.destroy();
    }
    editor = {
      tag: 'awake',
      view: new EditorView({
        state: editor.state,
        parent: contentEl!,
      }),
    };
  });
</script>

<div class="content" bind:this={contentEl}></div>

<style>
  div.content {
    width: 100%;
    height: 100%;
    font-family: monospace;
    color: var(--text);
  }
  :global(.cm-editor) {
    padding-bottom: 50%;
  }
  /* textarea {
    width: 100%;
    height: 100%;
    background: var(--back-1);
    color: var(--text);
    font-family: monospace;
    font-size: var(--font-size);
    border: none;
    padding: var(--pad);
    border-radius: var(--rad);
    resize: none;
  } */
</style>
