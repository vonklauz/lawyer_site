/**
 * Типы для RequisitesForm
 * Следуют правилам Feature-Sliced Design (FSD)
 */

import { ObjectWithProps } from "@/Models";

export interface SchemaField {
  name: string;
  title: string;
  type: "text" | "date";
  max_length?: number;
}

export interface SchemaBlock {
  fields: SchemaField[];
}

export interface SchemaResponse {
  success: boolean;
  data: {
    blocks: SchemaBlock[];
  };
}

export interface EntityFormData extends ObjectWithProps<string> {
  entity_id?: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RequestParams {
  headers: Record<string, string>;
  pathParams: Record<string, string>;
  body: EntityFormData;
}

export interface EntityResponse {
  success: boolean;
  error?: {
    code: number;
    message: string;
  };
  data?: EntityFormData;
}
