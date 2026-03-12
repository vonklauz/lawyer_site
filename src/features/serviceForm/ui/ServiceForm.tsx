"use client";

import { FC } from "react";
import { useGetServiceFormById } from "../api/useGetServiceFormById";
import { FormWrapper } from "@/shared/Ui/FormCustom/FormWrapper";
import { Button } from "@/shared/Ui/Button";
import { Input } from "@/shared/Ui/Input";
import { Select } from "@/shared/Ui/Select";
import { FormSelect } from "@/shared/Ui/formSelect";

export const ServiceForm: FC<{ serviceId: string }> = ({ serviceId }) => {
  const [response, isLoading] = useGetServiceFormById(serviceId);
  const { data } = response || {};
  console.log(data);

  const onChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // Логика обработки изменения поля формы
    };

  const mapOptions = (
    options: Array<{ ID: string; VALUE: string; LABEL?: string }>,
  ) => {
    return options.map((option) => ({
      value: option.VALUE,
      label: option.LABEL || option.VALUE,
    }));
  };

  return (
    <>
      <h2>Форма услуги</h2>
      <div className="flex justify-center mt-3 lg:mt-5">
        <FormWrapper className="w-[100%] max-w-[500px]">
          {data?.map(({ name, id, key, type, options, reqiured }) => {
            const isDateField = type === "DATE";
            const isSelectField = type === "SELECT";

            if (isSelectField) {
              return (
                <div className="w-[100%]" key={name}>
                  <FormSelect
                    className="w-full border"
                    label={name}
                    options={mapOptions(options || [])}
                    onChange={onChange(name)}
                    // value={form[name] ?? ''}
                    // error={errors?.[name]}
                    disabled={isLoading}
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
                  key={name}
                  label={name}
                  onChange={onChange(name)}
                  // value={form[name] ?? ''}
                  // error={errors?.[name]}
                  // disabled={isLoading}
                  // maxLength={max_length}
                />
              </div>
            );
          })}
          <Button type="submit" disabled={isLoading} className={`mt-[16px]`}>
            <p>Сохранить</p>
          </Button>
        </FormWrapper>
      </div>
    </>
  );
};
