import { handleLoginSuccess } from "@/Utils";
import { loginSchema } from "@/Utils/validation";
import { LoginResponse, useLogin, useRegister } from "../api";

export const CONFIG = {
    login: {
        title: "Вход",
        fields: ['email', 'password'],
        bottomLinks: [
            { href: "/auth/register", text: "Нет аккаунта?", linkText: 'Зарегистрируйтесь' },
        ],
        submitRequest: useLogin,
        successAction: (responseData: LoginResponse) => {
            handleLoginSuccess(responseData);
        },
        redirectPath: "/",
        validationSchema: loginSchema,
    },
    registration: {
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
}