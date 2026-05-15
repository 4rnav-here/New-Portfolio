export type Tab = {
  id: string;
  label: string;
  path: string;
  icon: 'tsx' | 'md' | 'jsx' | 'ts';
  isDirty?: boolean;
};

export type TabState = {
  openTabs: Tab[];
  activeTabId: string | null;
};

export type TabAction =
  | { type: 'OPEN_TAB'; tab: Tab }
  | { type: 'CLOSE_TAB'; id: string }
  | { type: 'SET_ACTIVE'; id: string }
  | { type: 'RESTORE'; tabs: Tab[]; activeId: string | null };

export const HOME_TAB: Tab = {
  id: 'home',
  label: 'home.tsx',
  path: '/',
  icon: 'tsx',
};

export const ALL_TABS: Tab[] = [
  HOME_TAB,
  { id: 'about', label: 'about.md', path: '/about', icon: 'md' },
  { id: 'skills', label: 'toolkit.jsx', path: '/skills', icon: 'jsx' },
  { id: 'projects', label: 'showcase.jsx', path: '/projects', icon: 'jsx' },
  { id: 'experience', label: 'experience.ts', path: '/experience', icon: 'ts' },
  { id: 'contact', label: 'contact.jsx', path: '/contact', icon: 'jsx' },
];

/** Given a route path, return the matching tab definition or undefined */
export function getTabByPath(path: string): Tab | undefined {
  return ALL_TABS.find((t) => t.path === path);
}

export function tabReducer(state: TabState, action: TabAction): TabState {
  switch (action.type) {
    case 'OPEN_TAB': {
      const exists = state.openTabs.find((t) => t.id === action.tab.id);
      if (exists) return { ...state, activeTabId: action.tab.id };
      return {
        openTabs: [...state.openTabs, action.tab],
        activeTabId: action.tab.id,
      };
    }

    case 'CLOSE_TAB': {
      const idx = state.openTabs.findIndex((t) => t.id === action.id);
      const remaining = state.openTabs.filter((t) => t.id !== action.id);

      let nextActive: string | null = null;
      if (remaining.length > 0) {
        nextActive = (remaining[idx] ?? remaining[idx - 1]).id;
      }

      return { openTabs: remaining, activeTabId: nextActive };
    }

    case 'SET_ACTIVE':
      return { ...state, activeTabId: action.id };

    case 'RESTORE':
      return { openTabs: action.tabs, activeTabId: action.activeId };

    default:
      return state;
  }
}
