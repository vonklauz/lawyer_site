"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useGetServiceFormById } from "../api/useGetServiceFormById";
import { FormWrapper } from "@/shared/Ui/FormCustom/FormWrapper";
import { Button } from "@/shared/Ui/Button";
import { Input } from "@/shared/Ui/Input";
import { FormSelect } from "@/shared/Ui/formSelect";
import { useCreateApiV1ServiceFieldValuesServiceServiceIdPost } from "@/generated/lawyersSiteApiComponents";
import {
  ServiceFormData,
  ServiceFormFieldType,
  ServiceFormProps,
} from "../model/types";
import { mapSchemaFromServiceFormData } from "../lib/validation";
import { ObjectWithProps } from "@/Models";
import { ValidationError } from "yup";
import { RequisitesModal } from "@/entities/requisitesModal";
import { getDefaultRadioOptions, getOptionIdByValue } from "@/shared/lib";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { RadioButton } from "@/shared/Ui/radioButton";
import { v4 as uuidv4 } from "uuid";
import { MaskedInput } from "@/shared/Ui/MaskedInput";

export const ServiceForm: FC<ServiceFormProps> = ({ serviceId }) => {
  const [form, setForm] = useState<ServiceFormData>({});
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState<ObjectWithProps<string>>({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const {
    data: response,
    error: getFieldsError,
    isPending: isLoading,
  } = useGetServiceFormById(serviceId);
  const {
    mutate: submitForm,
    data: submitResponse,
    isPending,
    error,
    isSuccess,
  } = useCreateApiV1ServiceFieldValuesServiceServiceIdPost();

  console.log(errors);

  const { data: initialFormFields = [] } = response || {};

  useEffect(() => {
    if (submitResponse?.success) {
      setIsConfirmModalOpen(false);
      toast("Услуга успешно зарегистрирована", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        router.push(`/service/ordered?serviceId=${serviceId}`);
      }, 2200);
    }
  }, [submitResponse]);

  const submitRequest = () => {
    const fields = Object.entries(form).map(([key, value]) => ({
      field_id: key,
      value,
    }));
    submitForm({
      headers: {
        //@ts-expect-error позже типизировать
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      pathParams: { serviceId },
      body: {
        service_id: serviceId,
        // @ts-expect-error позже типизировать
        fields,
      },
    });
  };

  const onChange =
    (id: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const field = initialFormFields?.find((f) => f.id === id);
      const { value } = e.target;
      const formattedValue =
        field?.type === "INTEGER"
          ? Number(value)
          : field?.type === "SELECT"
            ? //@ts-expect-error позже типизровать
              getOptionIdByValue(field?.options, value)
            : field?.type === "BOOL"
              ? value === "true"
              : value;
      const newForm = { ...form, [id]: formattedValue };

      setForm(newForm);
      if (errors?.[id]) {
        setErrors({ ...errors, [id]: "" });
      }
    };

  const validateAndSend = (): void => {
    const validationSchema = mapSchemaFromServiceFormData([
      //@ts-expect-error позже типизровать
      { id: "title", type: "STRING", required: true },
      //@ts-expect-error позже типизровать
      ...initialFormFields,
    ]);
    try {
      validationSchema.validateSync({ ...form, title }, { abortEarly: false });
    } catch (err) {
      const validationErrors = err as ValidationError;
      const newErrors: ObjectWithProps<string> = {};
      validationErrors.inner.forEach((e) => {
        newErrors[e.path as string] = e.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const mapOptions = (
    options: Array<{ ID: string; VALUE: string; LABEL?: string }> = [],
  ) => {
    return options?.map((option) => ({
      value: option.VALUE,
      label: option.LABEL || option.VALUE,
      id: option.ID || uuidv4(),
    }));
  };

  return (
    <>
      <ToastContainer progressClassName="form-progressbar" />
      <h2>Форма услуги</h2>
      <div className="flex justify-center mt-3 lg:mt-5">
        <FormWrapper className="w-[100%] max-w-[500px]">
          <div className="w-[100%]">
            <Input
              label="Наименование услуги"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              disabled={isLoading as boolean}
              error={errors?.title}
              maxLength={255}
            />
          </div>
          {initialFormFields?.map(
            //@ts-expect-error позже типизровать
            ({ name, id, key, type, options }: ServiceFormFieldType) => {
              const isDateField = type === "DATE";
              const isSelectField = type === "SELECT";
              const isNumberField = type === "INTEGER";
              const isRadioField = type === "BOOL";

              if (isSelectField) {
                return (
                  <div className="w-[100%]" key={name}>
                    <FormSelect
                      label={name}
                      options={mapOptions(options)}
                      onChange={onChange(id)}
                      value={form[id] as string}
                      error={errors?.[id]}
                      disabled={isLoading as boolean}
                    />
                  </div>
                );
              } else if (isRadioField) {
                return (
                  <div className="w-[100%]" key={name}>
                    <RadioButton
                      id={name}
                      label={name}
                      options={mapOptions(options) || getDefaultRadioOptions()}
                      onChange={onChange(id)}
                      value={form[id] as string}
                    />
                  </div>
                );
              } else if (isNumberField) {
                return (
                  <div className="w-[100%]" key={name}>
                    <MaskedInput
                      id={name}
                      mask="ddddddddd"
                      label={name}
                      replacement={{ d: /\d/ }}
                      onChange={onChange(id)}
                      value={form[id] ? Number(form[id]) : ""}
                      error={errors?.[id]}
                    />
                  </div>
                );
              }
              return (
                <div
                  className={`${isDateField ? "w-[30%]" : "w-[100%]"}`}
                  key={name}
                >
                  <Input
                    type={isDateField ? "date" : "text"}
                    label={name}
                    onChange={onChange(id)}
                    value={String(form[id] ?? "")}
                    error={errors?.[id]}
                    disabled={isLoading as boolean}
                    // maxLength={max_length}
                  />
                </div>
              );
            },
          )}

          <Button
            disabled={isLoading as boolean}
            className={`mt-[16px]`}
            onClick={validateAndSend}
          >
            <p>Сохранить</p>
          </Button>
        </FormWrapper>
        <RequisitesModal
          schema={[
            //@ts-expect-error позже типизровать
            { id: "title", type: "STRING", required: true },
            //@ts-expect-error позже типизровать
            ...initialFormFields,
          ]}
          details={{ ...form, title }}
          isOpen={isConfirmModalOpen}
          onConfirm={submitRequest}
          onEdit={() => setIsConfirmModalOpen(false)}
        />
      </div>
    </>
  );
};
