import { BaseInputOption } from "@/shared/models/types";
import { ChangeEvent } from "react";

export type FormSelectProps = {
  label: string;
  id?: string;
  name?: string;
  error?: string;
  options: BaseInputOption[];
  value: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};
