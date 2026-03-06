import { REDIRECT_TIMING } from "@/Consts";
import { ObjectWithProps, IBaseSuccessResponse, AuthResponse, RegisterData } from "@/Models";
import { clearPhoneNumberString, getDefaultUser } from "@/Utils";
import { REGISTER_CONFIG as CONFIG } from "../model/config";
import { useRouter } from "next/router";
import { useState, useActionState, useEffect } from "react";
import { ValidationError } from "yup";
import { LoginResponse } from "../model/types";
import { AuthForm } from "@/entities/authForm";

export const Register = () => {
    const [errors, setErrors] = useState<ObjectWithProps<string> | null>(null);
    const [isShowRegisterSuccessModal, setIsShowRegisterSuccessModal] = useState(false);

    const isLoginMode = false;
    const isRegistrationMode = !isLoginMode;


    const router = useRouter();
    const requestData = CONFIG.submitRequest();
    console.log(errors)

    const {
        mutate: request,
        isPending: isLoading,
    } = requestData;
    console.log('data', requestData)
    const requestDataResponse: IBaseSuccessResponse<LoginResponse> = requestData.data as any;

    const validateAndSend = (requestData: RegisterData) => {
        try {
            CONFIG.validationSchema.validateSync({ ...requestData }, { abortEarly: false })
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

        CONFIG.fields.forEach((fieldName) => {
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
            router.push(CONFIG.redirectPath);
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

    return (
        <>
            <AuthForm
                {...CONFIG}
                handleFormAction={handleFormAction}
                isLoginMode={isLoginMode}
                isRegistrationMode={isRegistrationMode}
                errors={errors}
            />
        </>
    )
}