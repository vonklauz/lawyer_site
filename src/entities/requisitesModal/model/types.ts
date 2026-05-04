import { ObjectWithProps } from "@/shared/models/types";

export interface SchemaField {
  name: string;
  title: string;
  type: "text" | "date" | "DATE" | "INTEGER" | "SELECT" | "STRING" | "BOOL" | "URL" | "FILE";
  max_length?: number;
  id?: string;
}

export interface RequisitesModalProps {
  isOpen: boolean;
  schema: SchemaField[];
  details: ObjectWithProps<string | number | boolean>;
  onConfirm: () => void;
  onEdit: () => void;
}
