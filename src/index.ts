/// <reference types='gimloader' />
import 'svelte';

import Main from './components/Main.svelte';
import { onBlocklyLoaded } from './lib/blockly';

let observer: MutationObserver | undefined;
let component: Main | undefined;
let added = false;

function destroy() {
  component?.$destroy();
}
function inject() {
  const contentDiv = document.querySelector('#content')!;
  function getBlocksDiv() {
    return contentDiv.querySelector(
      '.fill-height:has(.injectionDiv)'
    ) as HTMLElement | null;
  }
  if (contentDiv == null) {
    return;
  }
  function create(blocksDiv: HTMLElement) {
    const width = GL.storage.getValue('BlockConverter', 'editorWidth', 300);
    const height = GL.storage.getValue('BlockConverter', 'editorHeight', 300);
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.bottom = '4px';
    div.style.left = '4px';
    div.style.zIndex = '9999';
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.overflow = 'auto';
    div.style.pointerEvents = 'none';

    component = new Main({
      target: div,
      props: {
        wrapperDiv: div,
      },
    });

    blocksDiv.appendChild(div);
  }

  added = false;
  observer = new MutationObserver(() => {
    let blocksDiv = getBlocksDiv();
    if (blocksDiv != null && !added) {
      create(blocksDiv);
      added = true;
    }
    if (!blocksDiv && added) {
      destroy();
      added = false;
    }
  });

  observer.observe(contentDiv, {
    subtree: true,
    childList: true,
  });
}

onBlocklyLoaded(inject);

export function onStop() {
  observer?.disconnect();
  if (added) {
    destroy();
    added = false;
  }
}
