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
  //@ts-ignore позже типизировать
  entity_id?: string;
  //@ts-ignore позже типизировать
  id?: string;
  //@ts-ignore позже типизировать
  created_at?: string;
  //@ts-ignore позже типизировать
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
