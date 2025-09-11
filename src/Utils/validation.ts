import { object, string } from 'yup';
import { CYRILLIC_REGEXP, PHONE_REGEXP } from './regexps';
import type { IDossierFormField, ObjectWithProps } from '~/Models';

const REQUIRED_ERROR_MESSAGE = 'Поле обязательно для заполнения';

const getMessageForCyrillic = (fieldname: string): string => `Поле "${fieldname}" должно содержать только кириллические символы`;
const getMinLengthMessage = (fieldname: string): string => `Поле "${fieldname}" должно содержать не менее 3 символов`;
const getMaxLengthMessage = (fieldname: string): string => `Поле "${fieldname}" должно содержать не более 30 символов`;

const getFioField = (fieldname: string) => (
    string()
        .min(3, getMinLengthMessage(fieldname))
        .max(30, getMaxLengthMessage(fieldname))
        .matches(CYRILLIC_REGEXP, getMessageForCyrillic(fieldname))
);

export const loginSchema = object({
    email: string().email('Введите корректный email').required(REQUIRED_ERROR_MESSAGE),
    password: string().required(REQUIRED_ERROR_MESSAGE).min(8, 'Пароль должен содержать не менее 8 символов'),
});

export const registerSchema = object({
    lastName: getFioField('Фамилия').required(REQUIRED_ERROR_MESSAGE),
    firstName: getFioField('Имя').required(REQUIRED_ERROR_MESSAGE),
    secondName: string()
        .max(30, getMaxLengthMessage('Отчество'))
        .test('secondNameTest', getMessageForCyrillic('Отчество'), (value) => {
            if (value) {
                return CYRILLIC_REGEXP.test(value)
            } else {
                return true
            }
        }),
    phone: string().matches(PHONE_REGEXP, 'Номер телефона должен быть формата +7XXXXXXXXXX').length(12).required(),
}).concat(loginSchema);

/**
 * Собираем схему валидации из массивов полей форм заполнения анкеты.
 * @param data массив полей форм заполнения анкеты.
 */
export const mapSchemaFromData = (data:  IDossierFormField[][]) => {
    const schema: ObjectWithProps = {};

    data.forEach((fields) => {
        fields.forEach(({id, required, length, title}) => {
            let fieldSchema = string();
            if (required) {
                fieldSchema = fieldSchema.required(REQUIRED_ERROR_MESSAGE);
            }
            if (length) {
                fieldSchema = fieldSchema.max(length, getMaxLengthMessage(title));
            }
            schema[id] = fieldSchema;
        })
    })

    return object(schema)
}