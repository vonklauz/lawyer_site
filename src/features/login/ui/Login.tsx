"use client"
import { REDIRECT_TIMING } from "@/Consts";
import { ObjectWithProps, IBaseSuccessResponse, AuthResponse, RegisterData } from "@/Models";
import { clearPhoneNumberString, getDefaultUser } from "@/Utils";
import { LOGIN_CONFIG as CONFIG } from "../model/config";
import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { ValidationError } from "yup";
import { LoginResponse } from "../model/types";
import { AuthForm } from "@/entities/authForm";

export const Login = () => {
    const [errors, setErrors] = useState<ObjectWithProps<string> | null>(null);
    const [isShowRegisterSuccessModal, setIsShowRegisterSuccessModal] = useState(false);
    const [isShowOTPModal, setIsShowOTPModal] = useState(false);

    const isLoginMode = true;
    const isRegistrationMode = !isLoginMode;


    const router = useRouter();
    // const dispatch = useDispatch();
    const otpCheckRequest = CONFIG.verifyOtp();
    const requestData = CONFIG.submitRequest();
    console.log(errors)

    // const { mutate: checkOtpRq, isPending: isOtpChecking } = otpCheckRequest;
    const {
        mutate: request,
        isPending: isLoading,
    } = requestData;
    console.log('data', requestData)
    // const otpCheckResponse: IBaseSuccessResponse<LoginResponse> = otpCheckRequest.data as any;
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
            CONFIG.successAction(requestDataResponse.data);
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

    // useEffect(() => {
    //     if (otpCheckResponse?.success) {
    //         setIsShowOTPModal(false);
    //         if (CONFIG.successAction) {
    //             CONFIG.successAction(otpCheckResponse.data);
    //             router.push(CONFIG.redirectPath);
    //         }
    //     }
    //     if (otpCheckResponse?.error) {
    //         console.log(otpCheckResponse?.error)
    //     }
    // }, [otpCheckResponse]);

    const onOtpSubmit = (rs: IBaseSuccessResponse<AuthResponse>) => (otpCode: number) => {
        // checkOtpRq({
        //     headers: {
        //         Authorization: `Bearer ${rs.data.pending_token}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: {
        //         code: otpCode
        //     }
        // })
    }

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