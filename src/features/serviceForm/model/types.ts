import { ServiceSelectOption } from "@/shared/models/types";

export type ServiceFormFieldType = {
  id: string;
  name: string;
  key?: string;
  value: string | number | boolean;
  type: "STRING" | "INTEGER" | "BOOL" | "SELECT" | "DATE";
  required: boolean;
  options?: ServiceSelectOption[];
};

export type ServiceFormData = {
  [id: string]: string | number | boolean;
};
