import { atom } from "recoil";
export const loginState = atom({
  key: "loginState",
  default: false,
});

export const modalState = atom({
  key: "modalState",
  default: false,
});
