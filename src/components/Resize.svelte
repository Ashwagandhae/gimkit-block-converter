<script lang="ts">
  // https://stackoverflow.com/a/34487057
  //create box in top-right

  export let element: HTMLElement;

  let resizer: HTMLElement | null = null;

  //Window funtion mousemove & mouseup
  function initResize(e: MouseEvent) {
    window.addEventListener('mousemove', resizeElement, false);
    window.addEventListener('mouseup', stopResize, false);
  }
  //resize the element top & right
  function resizeElement(e: MouseEvent) {
    // element.style.width = e.clientX - element.offsetLeft + 'px';
    // element.style.height =
    //   element.offsetTop + element.offsetHeight - e.clientY + 'px';
    let rect = element.getBoundingClientRect();
    element.style.width = e.clientX - rect.left + 'px';
    element.style.height = rect.top + rect.height - e.clientY + 'px';
  }
  //on mouseup remove windows functions mousemove & mouseup
  function stopResize(e: MouseEvent) {
    window.removeEventListener('mousemove', resizeElement, false);
    window.removeEventListener('mouseup', stopResize, false);
    GL.storage.setValue(
      'BlockConverter',
      'editorWidth',
      element.style.width.replace('px', '')
    );
    GL.storage.setValue(
      'BlockConverter',
      'editorHeight',
      element.style.height.replace('px', '')
    );
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  class="resizer"
  bind:this={resizer}
  on:mousedown={initResize}
  role="separator"
></div>

<style>
  .resizer {
    width: 10px;
    height: 10px;
    background: transparent;
    position: absolute;
    right: 0;
    top: 0;
    cursor: ne-resize;
    z-index: 99999;
    pointer-events: auto;
  }
</style>
