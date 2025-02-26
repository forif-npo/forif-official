import { create } from 'zustand';

// filepath: /Users/standardwish/Documents/Projects/forif-official/apps/user/src/stores/effect.store.ts

interface EffectState {
  effectShow: boolean;
  toggleEffect: () => void;
  setEffect: (show: boolean) => void;
}

export const useEffectStore = create<EffectState>((set) => ({
  effectShow: localStorage.getItem('effectShow') === 'true',
  toggleEffect: () => {
    set((state) => {
      const newEffectShow = !state.effectShow;
      localStorage.setItem('effectShow', newEffectShow.toString());
      return { effectShow: newEffectShow };
    });
  },
  setEffect: (show: boolean) => {
    localStorage.setItem('effectShow', show.toString());
    set({ effectShow: show });
  },
}));
