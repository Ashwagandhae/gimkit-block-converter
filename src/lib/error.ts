import { setDiagnostics, type Diagnostic } from '@codemirror/lint';
import { AttachError, ConvertError } from 'gimblocks';

import { getEditorState, type ActiveTab, type Tab } from './lang';
import type { Message } from './message';

export function errorToMessage(err: unknown): Message {
  if (err instanceof Error) {
    return {
      title: err.name,
      text: err.message,
      severity: 'error',
    };
  } else {
    return {
      text: 'Unknown error',
      severity: 'error',
    };
  }
}

export function errorToDiagnostic(err: unknown): Diagnostic | null {
  if (err instanceof AttachError || err instanceof ConvertError) {
    let node = err.node;
    if (node == null) return null;
    return {
      from: node.start,
      to: node.end,
      message: err.message,
      severity: 'error',
    };
  }
  return null;
}

export function showError(tab: ActiveTab, err: unknown) {
  tab.message = errorToMessage(err);
  let diagnostic = errorToDiagnostic(err);
  if (diagnostic == null) return;

  const transaction = setDiagnostics(getEditorState(tab.editor), [diagnostic]);
  if (tab.editor.tag != 'awake') return;
  tab.editor.view.dispatch(transaction);
}

export function clearErrors(tab: ActiveTab) {
  tab.message = null;

  const transaction = setDiagnostics(getEditorState(tab.editor), []);
  if (tab.editor.tag != 'awake') return;
  tab.editor.view.dispatch(transaction);
}
