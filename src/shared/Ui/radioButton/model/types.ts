import { BaseInputOption } from "@/shared/models/types";
import { ChangeEvent } from "react";

export type RadioProps = {
  id: string;
  label: string;
  options: BaseInputOption[];
  value?: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
