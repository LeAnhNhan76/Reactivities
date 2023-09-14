import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import AuthStore from "./authStore";
import ModalStore from "./modalStore";

interface Store {
  activityStore: ActivityStore;
  authStore: AuthStore;
  modalStore: ModalStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  authStore: new AuthStore(),
  modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

export function useActivityStore() {
  return useContext(StoreContext)?.activityStore;
}

export function useAuthStore() {
  return useContext(StoreContext)?.authStore;
}

export function useModalStore() {
  return useContext(StoreContext)?.modalStore;
}