"use client"
import { REDIRECT_TIMING } from "@/Consts";
import { LoginResponse, RegisterData, ObjectWithProps } from "@/Models";
import { useLoginMutation, useRegisterMutation } from "@/Service/authApi";
import { setTokens } from "@/Store/Token/tokenSlice";
import { getDefaultUser } from "@/Store/User/userSlice";
import { FormCustom } from "@/ui/Components/FormCustom";
import { Input } from "@/ui/Components/Input";
import { InputPassword } from "@/ui/Components/Input/InputPassword";
import { RegisterSuccessModal } from "@/ui/Components/Modal/RegisterSuccessModal";
import { handleLoginSuccess, remapServerFieldToFrontFormat } from "@/Utils";
import { loginSchema } from "@/Utils/validation";
import { useState, useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ValidationError } from "yup";
import { useRegistrationAuthRegisterPost } from "../../../../generated/lawyersSiteApiComponents";

const CONFIG = {
    login: {
        title: "Вход",
        fields: ['email', 'password'],
        bottomLinks: [
            { href: "/register", text: "Не зарегистрированы? Создать аккаунт" },
            { href: "/restore", text: "Забыли пароль?" }
        ],
        submitRequest: useRegistrationAuthRegisterPost,
        successAction: (responseData: LoginResponse) => {
            handleLoginSuccess(responseData);
        },
        redirectPath: "/profile",
        validationSchema: loginSchema,
    },
    registration: {
        title: "Регистрация",
        fields: ['email', 'password'],
        bottomLinks: [{
            href: "/login",
            text: "Уже есть аккаунт? Войти"
        }],
        submitRequest: useRegistrationAuthRegisterPost,
        successAction: null,
        redirectPath: "/",
        validationSchema: loginSchema,
    }
}
interface IAuthFormProps {
    mode: "login" | "registration"
}

export const AuthForm = ({ mode }: IAuthFormProps) => {
    const [errors, setErrors] = useState<Partial<RegisterData> | null>(null);
    const [isShowModal, setIsShowModal] = useState(false)
    const navigate = (arg) => { };
    const dispatch = useDispatch();
    const data = CONFIG[mode].submitRequest();
    console.log(errors)
    // const data = useRegistrationAuthRegisterPost();
    const {
        mutateAsync: request,
    } = data;
    console.log('data', data)
    // useEffect(() => {
    //     mutateAsync({ body: { email: 'd@d.ru', password: 'asdadasd' } })
    // }, [])

    const validateAndSend = (requestData: RegisterData) => {
        try {
            CONFIG[mode].validationSchema.validateSync({ ...requestData }, { abortEarly: false })
        } catch (err) {
            const validationErrors = err as ValidationError;
            const newErrors: ObjectWithProps = {};
            validationErrors.inner.forEach((e) => {
                newErrors[e.path as string] = e.message;
            });
            setErrors(newErrors);
        }
        setErrors(null);
        request(requestData)
    }

    async function handleFormAction(prevState: unknown, formData: FormData) {
        const requestData = {} as RegisterData;

        CONFIG[mode].fields.forEach((fieldName) => {
            if (fieldName === 'phone') {
                //@ts-expect-error
                requestData[fieldName] = clearPhoneNumberString(formData.get(fieldName));
            } else {
                //@ts-expect-error
                requestData[fieldName] = formData.get(fieldName);
            }

        });

        validateAndSend(requestData);

        return requestData
    }

    const [actionState, action, isPending] = useActionState(handleFormAction, { ...getDefaultUser(), password: '' });

    // useEffect(() => {
    //     console.log(resultRequest.data)
    //     if (resultRequest.data?.success) {
    //         if (CONFIG[mode].successAction) {
    //             dispatch(setTokens(resultRequest.data.data));
    //             CONFIG[mode].successAction(resultRequest.data.data);
    //             navigate(CONFIG[mode].redirectPath);
    //         } else {
    //             setIsShowModal(true)
    //             setTimeout(() => navigate('/'), REDIRECT_TIMING);
    //         }

    //     } else if (resultRequest.data?.error) {
    //         const { field, message } = resultRequest.data?.error.message
    //         //remapServerFieldToFrontFormat
    //         const fieldname = remapServerFieldToFrontFormat(field);
    //         const backendError = { [fieldname]: message };
    //         setErrors({ ...backendError });
    //     }
    // }, [resultRequest]);

    const renderBottomLinkSection = () => {
        <div className="flex">
            <a href=""></a>
        </div>
        return (
            <div>
                {CONFIG[mode].bottomLinks.map((item) => (
                    <div className="flex" style={{ marginTop: '16px' }} key={item.href}>
                        <a href={item.href} style={{ textDecoration: 'underline' }}>{item.text}</a>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <FormCustom
            action={action}
            title={''}
        >
            <>
                <Input label="E-mail*" type="email" name="email" defaultValue={actionState.email} disabled={isPending} error={errors?.email} />
                <InputPassword label="Пароль*" type="password" name="password" defaultValue={actionState.password} disabled={isPending} error={errors?.password} />
                <button type="submit" disabled={isPending}>{mode === "registration" ? 'Регистрация' : 'Войти в кабинет'}</button>
                {renderBottomLinkSection()}
                {isShowModal && <RegisterSuccessModal isOpen={isShowModal} />}
            </>
        </FormCustom>
    )
}