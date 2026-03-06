import { loginSchema } from "@/Utils/validation";
import { useLogin } from "../api/useLogin";
import { LoginResponse } from "./types";
import { handleLoginSuccess } from "@/Utils";
import { useVerifyOtp } from "../api/useVerifyOtp";

export const LOGIN_CONFIG = {
    title: "Вход",
    fields: ['email', 'password'],
    bottomLinks: [
        { href: "/auth/register", text: "Нет аккаунта?", linkText: 'Зарегистрируйтесь' },
    ],
    verifyOtp: useVerifyOtp,
    submitRequest: useLogin,
    successAction: (responseData: LoginResponse) => {
        handleLoginSuccess(responseData);
    },
    redirectPath: "/",
    validationSchema: loginSchema,
}