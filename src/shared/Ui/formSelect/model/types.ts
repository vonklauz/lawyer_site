import { ChangeEvent } from "react";

export type FormSelectProps = {
  label: string;
  id?: string;
  name?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};
