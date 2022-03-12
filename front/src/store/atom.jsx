import { atom } from "recoil";
export const loginState = atom({
  key: "loginState",
  default: false,
});

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const mainRecipesState = atom({
  key: "mainRecipesState",
  default: {
    loading: false,
    error: undefined,
    data: undefined,
  },
});

export const rankRecipesState = atom({
  key: "rankRecipesState",
  default: [],
});

export const editorpickRecipesState = atom({
  key: "editorpickRecipesState",
  default: [],
});

export const bookmarkRecipesState = atom({
  key: "bookmarkRecipesState",
  default: [],
});

export const ingredientState = atom({
  key: "ingredientState",
  default: {
    loading: false,
    error: undefined,
    data: [],
  },
});
