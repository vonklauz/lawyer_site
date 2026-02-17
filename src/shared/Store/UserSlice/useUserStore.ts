import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User, UserState } from './models';
import { getDefaultUser } from './utils';

const useUserStore = create<UserState>()(
    immer(
        persist(
            devtools((set) => ({
                user: getDefaultUser(),
                setUser: (newUser: User) => set({ user: { ...newUser } }),
                removeUser: () => set({ user: getDefaultUser() }),
                hasHydrated: false,
                setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
            })),
            {
                name: 'user-storage',
                onRehydrateStorage: () => (state) => {
                    state?.setHasHydrated(true)
                },
            }
        )
    )
);

export default useUserStore;