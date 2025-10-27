import { User } from '@/Models';
import { getDefaultUser } from '@/Utils';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserState {
    user: User;
    setUser: (newUser: User) => void;
    removeUser: () => void;
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}

const useUserStore = create<UserState>()(
    immer(
        persist(
            devtools((set) => ({
                user: getDefaultUser(),
                setUser: (newUser: User) => set({ user: { ...newUser } }),
                removeUser: () => set({ user: getDefaultUser() }),
                hasHydrated: false,
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