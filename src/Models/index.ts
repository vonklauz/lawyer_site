export type Link = {
    label: string,
    path: string,
    isProtected?: boolean
}

export type ObjectWithProps<T = any> = Record<string, T>;

export type FormAction = (formData: FormData) => void;

export type ServerError = {
    code: number,
    message: ObjectWithProps,
}

/**
 * Базовый тип для ответов от сервера.
 */
export interface IBaseSuccessResponse<T> {
    success: boolean;
    error?: ServerError;
    data: T;
}

export interface ISimpleResponse {
    success: boolean
}

export interface Login {
    email: string;
    password: string;
}

export interface RegisterData extends Login {
    // firstName: string;
    // lastName: string;
    // secondName?: string;
    // phone: string;
}

export type RoleName = "User";

export type Role = {
    id: string;
    name: RoleName;
}

export interface IRegisterResponse {
    email: string;
    id: string;
    is_2fa_enabled: boolean;
    is_active: boolean;
    is_email_verified: boolean;
    roles: Role[];
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    pending_token: string;
    two_fa_required?: boolean,
}

export interface AuthResponse extends IRegisterResponse, LoginResponse { }

export interface User {
    firstName: string;
    lastName: string;
    secondName?: string;
    userId: string;
    phone: string;
    email: string;
}

export type TSelectOption<T = string> = {
    label: string;
    value: T;
}