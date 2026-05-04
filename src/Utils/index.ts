import { AuthLoginResponseDTO } from "@/generated/lawyersSiteApiSchemas";
import { User } from "@/shared/models/types";
import { format } from "date-fns";

export const getDefaultUser = (): User => ({
  firstName: "",
  secondName: "",
  lastName: "",
  userId: "",
  email: "",
  phone: "",
});

export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

export const handleLoginSuccess = (data: AuthLoginResponseDTO) => {
  const accessToken = data.access_token ?? "";
  const refreshToken = data.refresh_token ?? "";
  const user = parseJwt(accessToken);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("rawUser", JSON.stringify(user));
};

export const handleOtpTokenRecieve = (data: AuthLoginResponseDTO) => {
  const token = parseJwt(data.pending_token ?? "");
  return token;
};

export const handleLogoutSuccess = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("rawUser");
  sessionStorage.removeItem("user");
};

export const clearPhoneNumberString = (phone: string): string =>
  phone
    .split("")
    .filter((el) => !["(", ")", "-", " "].includes(el))
    .join("");

export const cloneDeep = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

/**
 * Возвращает дату в виде строки, ожидаемой сервером, если она валидна.
 * @param date Строка вида '31.05.1970'
 */
export const getDateFromString = (date: string): string => {
  const [day, month, year] = date.split(".").map(Number);
  return format(new Date(year, month - 1, day), "yyyy-MM-dd");
};

/**
 * Проверяет пустой ли объект или массив.
 */
export const isEmpty = (value: unknown[] | object): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === "object" && value !== null) {
    return !Object.keys(value).length;
  }
  return false;
};

export const isNullOrUndefined = (value: unknown): boolean =>
  value === null || value === undefined;

export const isSkipToken = (value: unknown) => typeof value === "symbol";
