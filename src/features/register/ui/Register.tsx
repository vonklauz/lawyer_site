"use client";
import { REDIRECT_TIMING } from "@/Consts";
import { ObjectWithProps, RegisterData } from "@/Models";
import { clearPhoneNumberString, getDefaultUser } from "@/Utils";
import { REGISTER_CONFIG as CONFIG } from "../model/config";
import { useRouter } from "next/navigation";
import { useState, useActionState, useEffect } from "react";
import { ValidationError } from "yup";
import { AuthForm } from "@/entities/authForm";
import { RegisterSuccessModal } from "@/shared/Ui/Modal/RegisterSuccessModal";

export const Register = () => {
  const [errors, setErrors] = useState<ObjectWithProps<string> | null>(null);
  const [isShowRegisterSuccessModal, setIsShowRegisterSuccessModal] =
    useState(false);

  const isLoginMode = false;
  const isRegistrationMode = !isLoginMode;

  const router = useRouter();
  const requestData = CONFIG.submitRequest();

  const { mutate: request, isPending: isLoading } = requestData;
  const requestDataResponse = requestData.data;

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
      setIsShowRegisterSuccessModal(true);
      setTimeout(() => {
        setIsShowRegisterSuccessModal(false);
        router.push(CONFIG.redirectPath);
      }, REDIRECT_TIMING);
    }
    // } else if (requestDataResponse?.error) {
    //   if (typeof requestDataResponse?.error.message === "object") {
    //     const { field, message } = requestDataResponse?.error.message;
    //     //remapServerFieldToFrontFormat
    //     const fieldname = field;
    //     const backendError = { [fieldname]: message };
    //     setErrors({ ...backendError });
    //   }
    else {
      setErrors({
        general:
          "Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.",
      });
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
      <RegisterSuccessModal isOpen={isShowRegisterSuccessModal} />
    </>
  );
};
