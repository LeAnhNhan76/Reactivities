import { createContext, useContext } from "react";
import AuthStore from './authStore'
import ActivitiesStore from "./activitiesStore";
import UsersStore from "./usersStore";
import CommonStore from "./commonStore";
import CommentsStore from "./commentsStore";

interface Store {
  authStore: AuthStore;
  activitiesStore: ActivitiesStore;
  usersStore: UsersStore;
  commonStore: CommonStore;
  commentsStore: CommentsStore
}

export const store: Store = {
  authStore: new AuthStore(),
  activitiesStore: new ActivitiesStore(),
  usersStore: new UsersStore(),
  commonStore: new CommonStore(),
  commentsStore: new CommentsStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}