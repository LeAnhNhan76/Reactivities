import { createContext, useContext } from "react";
import AuthStore from './authStore'
import ActivitiesStore from "./activitiesStore";
import UsersStore from "./usersStore";

interface Store {
  authStore: AuthStore;
  activitiesStore: ActivitiesStore;
  usersStore: UsersStore
}

export const store: Store = {
  authStore: new AuthStore(),
  activitiesStore: new ActivitiesStore(),
  usersStore: new UsersStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}