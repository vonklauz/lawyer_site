"use client";
import { ObjectWithProps, RegisterData } from "@/Models";
import { clearPhoneNumberString, getDefaultUser } from "@/Utils";
import { LOGIN_CONFIG as CONFIG } from "../model/config";
import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { ValidationError } from "yup";
import { AuthForm } from "@/entities/authForm";
import {
  AuthErrorResponse,
  AuthHTTPValidationError,
  AuthSuccessResponseLoginResponseDTO,
} from "@/generated/lawyersSiteApiSchemas";
import { LoginSuccessModal } from "@/shared/Ui/Modal/LoginSuccessModal";

export const Login = () => {
  const [errors, setErrors] = useState<ObjectWithProps<string> | null>(null);
  const [isShowOTPModal, setIsShowOTPModal] = useState(false);

  const isLoginMode = true;
  const isRegistrationMode = !isLoginMode;

  const router = useRouter();
  // const dispatch = useDispatch();
  const otpCheckRequest = CONFIG.verifyOtp();
  const requestData = CONFIG.submitRequest();

  const {
    verifyOtp: checkOtpRq,
    // data: otpCheckResponse,
    error: otpCheckError,
    // isPending: isOtpChecking,
  } = otpCheckRequest;

  const {
    mutate: request,
    isPending: isLoading,
    data: requestDataResponse,
    error: requestDataError,
  } = requestData;

  const validateAndSend = (requestData: RegisterData) => {
    try {
      CONFIG.validationSchema.validateSync(
        { ...requestData },
        { abortEarly: false },
      );
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
    request({ body: requestData });
  };

  async function handleFormAction(prevState: unknown, formData: FormData) {
    if (isLoading || isPending) return;

    const requestData = {} as RegisterData;

    CONFIG.fields.forEach((fieldName) => {
      if (fieldName === "phone") {
        requestData[fieldName as keyof RegisterData] = clearPhoneNumberString(
          formData.get(fieldName) as string,
        );
      } else {
        requestData[fieldName as keyof RegisterData] = formData.get(
          fieldName,
        ) as string;
      }
    });
    validateAndSend(requestData);

    return requestData;
  }

  const [_, __, isPending] = useActionState(handleFormAction, {
    ...getDefaultUser(),
    password: "",
  });

  useEffect(() => {
    if (requestDataResponse?.success) {
      CONFIG.successAction(requestDataResponse.data);
      router.push(CONFIG.redirectPath);
    } else if (requestDataResponse?.success === false) {
      setErrors({ general: "Неверный логин или пароль" });
    } else if (requestDataError) {
      const { payload = {}, status } = requestDataError;
      if (typeof payload === "object") {
        if ([400, 401].includes(+status)) {
          const { error } = payload as AuthErrorResponse;
          const { field, message } = error;
          const fieldname = field as string;
          const backendError = { [fieldname]: message };
          setErrors({ ...backendError });
        } else if (+status === 403) {
          //   console.log("403 error", payload);
          setErrors({ general: "Ошибка валидации." });
        } else if (status === 422) {
          const { detail } = payload as AuthHTTPValidationError;
          //   console.log(detail);
          setErrors({ general: "Ошибка валидации." });
        }
      } else {
        setErrors({ general: payload });
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

  const onOtpSubmit =
    (rs: AuthSuccessResponseLoginResponseDTO | undefined) =>
    (otpCode: number) => {
      if (!rs) {
        return;
      }
      checkOtpRq({
        headers: {
          // @ts-expect-error позже типизировать
          Authorization: `Bearer ${rs.data.pending_token}`,
          "Content-Type": "application/json",
        },
        body: {
          code: otpCode,
        },
      });
    };

  return (
    <>
      <AuthForm
        {...CONFIG}
        handleFormAction={handleFormAction}
        isLoginMode={isLoginMode}
        isRegistrationMode={isRegistrationMode}
        errors={errors}
      />
      <LoginSuccessModal
        isOpen={isShowOTPModal}
        onOtpSubmit={onOtpSubmit(requestDataResponse)}
        error={otpCheckError?.payload}
      />
    </>
  );
};
