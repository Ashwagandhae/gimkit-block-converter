import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { get } from 'svelte/store';
import type { Message } from './message';
import { tick } from 'svelte';

export const langs = ['json', 'js'] as const;

export type Lang = (typeof langs)[number];

export type AsleepEditor = {
  tag: 'asleep';
  state: EditorState;
};
export type AwakeEditor = {
  tag: 'awake';
  view: EditorView;
};

export type Editor = AsleepEditor | AwakeEditor;

export function getEditorState(
  editor: AsleepEditor | AwakeEditor
): EditorState {
  if (editor.tag === 'asleep') {
    return editor.state;
  } else {
    return editor.view.state;
  }
}

export type InactiveTab = {
  tag: 'inactive';
  editor: AsleepEditor | AwakeEditor;
  message: Message | null;
};

export type ActiveTab = {
  tag: 'active';
  editor: AsleepEditor | AwakeEditor;
  message: Message | null;
};

export type Tab = InactiveTab | ActiveTab;

export type Tabs = Record<Lang, Tab>;

function extensionsForLang(lang: Lang) {
  let ret = [basicSetup, keymap.of([indentWithTab]), oneDark];
  if (lang === 'json') {
    ret.push(json());
  } else if (lang === 'js') {
    ret.push(javascript());
  }
  return ret;
}

export function initTabs(): Tabs {
  return {
    json: {
      tag: 'active',
      editor: {
        tag: 'asleep',
        state: EditorState.create({
          doc: `{}`,
          extensions: extensionsForLang('json'),
        }),
      },
      message: null,
    },
    js: {
      tag: 'inactive',
      editor: {
        tag: 'asleep',
        state: EditorState.create({
          doc: `function run(d) {}`,
          extensions: extensionsForLang('js'),
        }),
      },
      message: null,
    },
  };
}

export function activateTab(tabs: Tabs, lang: Lang): Tabs {
  // find current active tab
  let currentActiveLang: Lang | undefined = langs.find(
    (lang) => tabs[lang].tag == 'active'
  );
  if (currentActiveLang != null) {
    tabs[currentActiveLang] = {
      ...tabs[currentActiveLang],
      tag: 'inactive',
    };
  }
  tabs[lang] = {
    ...tabs[lang],
    tag: 'active',
  };
  return tabs;
}

export function getActiveTab(tabs: Tabs): ActiveTab | null {
  for (let lang of langs) {
    if (tabs[lang].tag == 'active') {
      return tabs[lang] as ActiveTab;
    }
  }
  return null;
}
