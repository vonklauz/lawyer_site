import { User } from "@/shared/models/types";

export type { User };

export interface UserState {
  user: User;
  setUser: (newUser: User) => void;
  removeUser: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}
