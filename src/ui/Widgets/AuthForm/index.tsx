"use client"
import { REDIRECT_TIMING } from "@/Consts";
import { LoginResponse, RegisterData, ObjectWithProps } from "@/Models";
import { useLoginMutation, useRegisterMutation } from "@/Service/authApi";
import { setTokens } from "@/Store/Token/tokenSlice";
import { getDefaultUser } from "@/Store/User/userSlice";
import { FormCustom } from "@/ui/Components/FormCustom";
import formStyles from "@/ui/Components/FormCustom/Form.module.css";
import { Input } from "@/ui/Components/Input";
import { InputPassword } from "@/ui/Components/Input/InputPassword";
import { RegisterSuccessModal } from "@/ui/Components/Modal/RegisterSuccessModal";
import { handleLoginSuccess, remapServerFieldToFrontFormat } from "@/Utils";
import { loginSchema } from "@/Utils/validation";
import { useState, useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ValidationError } from "yup";
import { useRegistrationAuthRegisterPost } from "../../../../generated/lawyersSiteApiComponents";
import { FormWrapper } from "@/ui/Components/FormCustom/FormWrapper";
import { Button } from "@/ui/Components/Button";

const CONFIG = {
    login: {
        title: "Вход",
        fields: ['email', 'password'],
        bottomLinks: [
            { href: "/register", text: "Нет аккаунта?", linkText: 'Зарегистрируйтесь' },
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
            href: "/auth/login",
            text: "Уже есть аккаунт?",
            linkText: 'Войдите'
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
    const isLoginMode = mode === 'login';
    const isRegistrationMode = !isLoginMode;
    const navigate = (arg) => { };
    const dispatch = useDispatch();
    const requestData = CONFIG[mode].submitRequest();
    console.log(errors)
    // const data = useRegistrationAuthRegisterPost();
    const {
        mutateAsync: request,
    } = requestData;
    console.log('data', requestData)
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
            return;
        }
        setErrors(null);
        request({ body: requestData })
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

    useEffect(() => {
        console.log(requestData.data)
        if (requestData.data?.success) {
            if (CONFIG[mode].successAction) {
                dispatch(setTokens(requestData.data.data));
                CONFIG[mode].successAction(requestData.data.data);
                navigate(CONFIG[mode].redirectPath);
            } else {
                setIsShowModal(true)
                setTimeout(() => navigate('/'), REDIRECT_TIMING);
            }

        } else if (requestData.data?.error) {
            const { field, message } = requestData.data?.error.message
            //remapServerFieldToFrontFormat
            const fieldname = remapServerFieldToFrontFormat(field);
            const backendError = { [fieldname]: message };
            setErrors({ ...backendError });
        }
    }, [requestData.data]);

    const renderBottomLinkSection = () => {
        return (
            <>
                {CONFIG[mode].bottomLinks.map((item) => (
                    <div className="flex justify-center mt-[8px]" key={item.href}>
                        <a href={item.href} className="underline">
                            {item.text}
                            {item.linkText && <span> {item.linkText}</span>}
                        </a>
                    </div>
                ))}
            </>
        )
    }

    return (
        <FormWrapper
            action={action}
            className={formStyles.authForm}
        >
            <>
                <Input label="E-mail*" type="email" name="email" id="emailInput" defaultValue={actionState.email} disabled={isPending} error={errors?.email} />
                <InputPassword label="Пароль*" type="password" name="password" id="passwordInput" defaultValue={actionState.password} disabled={isPending} error={errors?.password} />
                {isLoginMode && <div className="flex justify-center mt-[4px]">
                    <a href="/auth/restore" className="underline">Забыли пароль?</a>
                </div>}
                <Button type="submit" disabled={isPending} classname={`right-arrow ${isLoginMode ? 'mt-[16px]' : 'mt-[4px]'}`}><p>{isRegistrationMode ? 'Регистрация' : 'Войти в кабинет'}</p></Button>
                {renderBottomLinkSection()}
                {isShowModal && <RegisterSuccessModal isOpen={isShowModal} />}
            </>
        </FormWrapper>
    )
}