"use client"
import { REDIRECT_TIMING } from "@/Consts";
import { RegisterData, ObjectWithProps, IBaseSuccessResponse, AuthResponse } from "@/Models";
import formStyles from "@/shared/Ui/FormCustom/Form.module.css";
import { Input } from "@/shared/Ui/Input";
import { InputPassword } from "@/shared/Ui/Input/InputPassword";
import { RegisterSuccessModal } from "@/shared/Ui/Modal/RegisterSuccessModal";
import { getDefaultUser, } from "@/Utils";
import { loginSchema } from "@/Utils/validation";
import { useState, useActionState, useEffect } from "react";
import { ValidationError } from "yup";
import { FormWrapper } from "@/shared/Ui/FormCustom/FormWrapper";
import { Button } from "@/shared/Ui/Button";
import { useVerifyCode2faTotpVerifyCodePost } from "@generated/lawyersSiteApiComponents";
import { useRouter } from 'next/navigation';
import { LoginSuccessModal } from "@/shared/Ui/Modal/LoginSuccessModal";
import { CONFIG } from "../config";

interface IAuthFormProps {
    mode: "login" | "registration"
}

export const AuthForm = ({ mode }: IAuthFormProps) => {
    const [errors, setErrors] = useState<ObjectWithProps<string> | null>(null);
    const [isShowRegisterSuccessModal, setIsShowRegisterSuccessModal] = useState(false);
    const [isShowOTPModal, setIsShowOTPModal] = useState(false);

    const isLoginMode = mode === 'login';
    const isRegistrationMode = !isLoginMode;


    const router = useRouter();
    // const dispatch = useDispatch();
    const otpCheckRequest = useVerifyCode2faTotpVerifyCodePost();
    const requestData = CONFIG[mode].submitRequest();
    console.log(errors)

    const { mutate: checkOtpRq, isPending: isOtpChecking } = otpCheckRequest;
    const {
        mutate: request,
        isPending: isLoading,
    } = requestData;
    console.log('data', requestData)
    const otpCheckResponse: IBaseSuccessResponse<AuthResponse> = otpCheckRequest.data as any;
    const requestDataResponse: IBaseSuccessResponse<AuthResponse> = requestData.data as any;

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
        if (isLoading || isPending) return;

        const requestData = {} as RegisterData;

        CONFIG[mode].fields.forEach((fieldName) => {
            if (fieldName === 'phone') {
                requestData[fieldName as keyof RegisterData] = clearPhoneNumberString(formData.get(fieldName) as string);
            } else {
                requestData[fieldName as keyof RegisterData] = (formData.get(fieldName) as string);
            }

        });
        validateAndSend(requestData);

        return requestData
    }

    const [actionState, action, isPending] = useActionState(handleFormAction, { ...getDefaultUser(), password: '' });

    useEffect(() => {
        console.log(requestDataResponse)
        if (requestDataResponse?.success) {
            if (CONFIG[mode].successAction) {
                // dispatch(setTokens(requestDataResponse.data));
                if (requestDataResponse.data.two_fa_required) {
                    setIsShowOTPModal(true);
                } else {
                    CONFIG[mode].successAction(requestDataResponse.data);
                    router.push(CONFIG[mode].redirectPath);
                }

            } else {
                setIsShowRegisterSuccessModal(true)
                setTimeout(() => router.push('/'), REDIRECT_TIMING);
            }
        } else if (requestDataResponse?.error) {
            if (typeof requestDataResponse?.error.message === 'object') {
                const { field, message } = requestDataResponse?.error.message
                //remapServerFieldToFrontFormat
                const fieldname = field;
                const backendError = { [fieldname]: message };
                setErrors({ ...backendError });
            } else {
                setErrors({ 'general': requestDataResponse?.error.message });
            }


        }
    }, [requestDataResponse]);

    useEffect(() => {
        if (otpCheckResponse?.success) {
            setIsShowOTPModal(false);
            if (CONFIG[mode].successAction) {
                CONFIG[mode].successAction(otpCheckResponse.data);
                router.push(CONFIG[mode].redirectPath);
            }
        }
        if (otpCheckResponse?.error) {
            console.log(otpCheckResponse?.error)
        }
    }, [otpCheckResponse]);

    const onOtpSubmit = (rs: IBaseSuccessResponse<AuthResponse>) => (otpCode: number) => {
        checkOtpRq({
            headers: {
                Authorization: `Bearer ${rs.data.pending_token}`,
                'Content-Type': 'application/json'
            },
            body: {
                code: otpCode
            }
        })
    }

    const renderBottomLinkSection = () => {
        return (
            <>
                {CONFIG[mode].bottomLinks.map((item) => (
                    <div className="flex justify-center mt-[8px]" key={item.href}>
                        <a href={item.href} className="font-normal">
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
                <Input label="E-mail" type="email" name="email" id="emailInput" defaultValue={actionState?.email} disabled={isLoading} error={errors?.email} />
                <InputPassword label="Пароль" type="password" name="password" id="passwordInput" defaultValue={actionState?.password} disabled={isLoading} error={errors?.password} />
                {isLoginMode && <div className="flex justify-center mt-[4px]">
                    <a href="/auth/restore" className="underline">Забыли пароль?</a>
                </div>}
                <Button type="submit" disabled={isLoading} className={`right-arrow ${isLoginMode ? 'mt-[16px]' : 'mt-[4px]'}`}><p>{isRegistrationMode ? 'Регистрация' : 'Войти в кабинет'}</p></Button>
                {errors?.general && <div className="error text-center mt-[8px]">{errors.general}</div>}
                {renderBottomLinkSection()}
                <RegisterSuccessModal isOpen={isShowRegisterSuccessModal} />
                <LoginSuccessModal
                    isOpen={isShowOTPModal}
                    onOtpSubmit={onOtpSubmit(requestDataResponse)}
                    error={otpCheckResponse?.error?.message as string | undefined}
                />
            </>
        </FormWrapper>
    )
}