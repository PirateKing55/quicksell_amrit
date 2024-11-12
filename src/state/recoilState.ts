import { atom, selector } from "recoil";

export const displayModeState = atom<string>({
  key: "displayModeState",
  default: "status",
});

export const sortCriteriaState = atom<string>({
  key: "sortCriteriaState",
  default: "priority",
});

export const displayModePreferenceSelector = selector({
  key: "displayModePreferenceSelector",
  get: ({ get }) => get(displayModeState),
  set: ({ set }, newValue) => set(displayModeState, newValue),
});

export const sortCriteriaPreferenceSelector = selector({
  key: "sortCriteriaPreferenceSelector",
  get: ({ get }) => get(sortCriteriaState),
  set: ({ set }, newValue) => set(sortCriteriaState, newValue),
});
