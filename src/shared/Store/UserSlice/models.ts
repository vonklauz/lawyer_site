export interface User {
    firstName: string;
    lastName: string;
    secondName?: string;
    userId: string;
    phone: string;
    email: string;
}

export interface UserState {
    user: User;
    setUser: (newUser: User) => void;
    removeUser: () => void;
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}