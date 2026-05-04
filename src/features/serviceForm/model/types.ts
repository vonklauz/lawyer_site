import { ServicesOutputServiceFieldDTO } from "@/generated/lawyersSiteApiSchemas";

/**
 * Поле формы услуги — совпадает с generated DTO.
 */
export type ServiceFormFieldType = ServicesOutputServiceFieldDTO;

export type ServiceFormData = {
  [id: string]: string | number | boolean;
};

export type ServiceFormProps = {
  serviceId: string;
};
