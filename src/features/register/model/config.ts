import { loginSchema } from "@/Utils/validation";
import { useRegister } from "../api/useLogin";

export const REGISTER_CONFIG = {
    title: "Регистрация",
    fields: ['email', 'password'],
    bottomLinks: [{
        href: "/auth/login",
        text: "Уже есть аккаунт?",
        linkText: 'Войдите'
    }],
    submitRequest: useRegister,
    successAction: null,
    redirectPath: "/",
    validationSchema: loginSchema,
}