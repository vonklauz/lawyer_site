import { loginSchema } from "@/shared/lib/validation";
import { useLogin } from "../api/useLogin";
import { handleLoginSuccess } from "@/shared/lib";
import { useVerifyOtp } from "../api/useVerifyOtp";
import { AuthLoginResponseDTO } from "@/generated/lawyersSiteApiSchemas";

export const LOGIN_CONFIG = {
  title: "Вход",
  fields: ["email", "password"],
  bottomLinks: [
    {
      href: "/auth/register",
      text: "Нет аккаунта?",
      linkText: "Зарегистрируйтесь",
    },
  ],
  verifyOtp: useVerifyOtp,
  submitRequest: useLogin,
  successAction: (responseData: AuthLoginResponseDTO) => {
    handleLoginSuccess(responseData);
  },
  redirectPath: "/",
  validationSchema: loginSchema,
};
