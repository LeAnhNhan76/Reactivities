import { createContext, useContext } from "react";
import AuthStore from './authStore'
import ActivitiesStore from "./activitiesStore";

interface Store {
  authStore: AuthStore;
  activitiesStore: ActivitiesStore;
}

export const store: Store = {
  authStore: new AuthStore(),
  activitiesStore: new ActivitiesStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}