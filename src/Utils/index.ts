import { LoginResponse, RegisterData } from "@/Models";
import { dispatch } from "@/Store";
import { setUser, getDefaultUser } from "@/Store/User/userSlice";
import { format } from "date-fns";


export const parseJwt = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const handleLoginSuccess = (data: LoginResponse) => {
    const accessToken = data.access_token;
    const user = parseJwt(accessToken);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('rawUser', JSON.stringify(user));
}

export const handleLogoutSuccess = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('rawUser');
    sessionStorage.removeItem('user');
    dispatch(setUser(getDefaultUser()));
}

export const clearPhoneNumberString = (phone: string): string => phone.split('').filter((el) => !['(', ')', '-', ' '].includes(el)).join('');

export const remapServerFieldToFrontFormat = (backendField: string): keyof RegisterData => {
    const fieldsMap: { [key: string]: keyof RegisterData } = {
        'first_name': 'firstName',
        'last_name': 'lastName',
        'second_name': 'secondName',
    }
    return fieldsMap[backendField] || backendField;
}

export const cloneDeep = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data));
};

/**
 * Возврашает дату в виде строки, ожидаемой сервером, если она валидна.
 * @param date Строка вида '31.05.1970'
 * @returns 
 */
export const getDateFromString = (date: string): string => {
    const [day, month, year] = date.split('.').map(Number);
    return format(new Date(year, month - 1, day), 'yyyy-MM-dd');
}

/**
 * Проверяет пустой ли объект или массив.
 * @param value массив или объект
 * @returns boolean
 */
export const isEmpty = (value: any[] | object): boolean => {
    if (Array.isArray(value)) {
        return value.length === 0;
    } else if (typeof value === 'object') {
        return !Object.keys(value).length;
    }

    return false;
}