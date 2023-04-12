import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import AuthStore from "./authStore";

interface Store {
  activityStore: ActivityStore;
  authStore: AuthStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  authStore: new AuthStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}