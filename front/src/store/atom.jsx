import { atom } from "recoil";
export const loginState = atom({
  key: "loginState",
  default: null,
});

export const modalState = atom({
  key: "modalState",
  default: false,
});
