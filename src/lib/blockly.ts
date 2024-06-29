let Blockly: any;

let blocklyLoadedCallbacks: (() => void)[] = [];
export function onBlocklyLoaded(cb: () => void) {
  blocklyLoadedCallbacks.push(cb);
}

GL.parcel.interceptRequire(
  'blocks converter',
  (exports) => {
    try {
      if (
        JSON.stringify(exports).includes('blockly') &&
        exports?.ALIGN_LEFT == -1
      ) {
        return true;
      }
    } catch (e) {}
    return false;
  },
  (exports) => {
    console.log('loaded blockly');
    Blockly = exports;
    for (const cb of blocklyLoadedCallbacks) {
      cb();
    }
    blocklyLoadedCallbacks = [];
  },
  true
);

export function loadJsonToWorkspace(json: any) {
  Blockly.serialization.workspaces.load(json, Blockly.getMainWorkspace());
}

export function getJsonFromWorkspace(): string {
  return Blockly.serialization.workspaces.save(Blockly.getMainWorkspace());
}
