import { User } from "./models";

export const getDefaultUser = (): User => (
    {
        firstName: '',
        secondName: '',
        lastName: '',
        userId: '',
        email: '',
        phone: ''
    }
)