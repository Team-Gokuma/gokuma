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
  default: [],
});

export const relatedRecipesState = atom({
  key: "relatedRecipesState",
  default: [],
});

export const ingredientState = atom({
  key: "ingredientState",
  default: [],
});
