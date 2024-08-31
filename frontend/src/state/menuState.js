import { atom } from 'recoil';

export const openMenusState = atom({
  key: 'openMenusState',
  default: {},
});

export const selectedRootMenuState = atom({
  key: 'selectedRootMenuState',
  default: '',
});

export const selectedMenuState = atom({
  key: 'selectedMenuState',
  default: null,
});

export const selectedSubmenuState = atom({
  key: 'selectedSubmenuState',
  default: null,
});
