import { PaletteMode } from '@packages/components/PaletteMode';

export interface AppBarProps {
  mode: PaletteMode;
  toggleSeasonEffect: () => void;
  toggleColorMode: () => void;
}

export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  href: string;
  submenu?: SubMenuItem[];
}
