/**
 * Типы для RequisitesModal
 * Следуют правилам Feature-Sliced Design (FSD)
 */

import { ObjectWithProps } from "@/Models";

export interface SchemaField {
  name: string;
  title: string;
  type: "text" | "date";
  max_length?: number;
}

export interface RequisitesModalProps {
  isOpen: boolean;
  schema: SchemaField[];
  details: ObjectWithProps<string>;
  onConfirm: () => void;
  onEdit: () => void;
}
