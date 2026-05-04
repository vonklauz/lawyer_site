import { ObjectWithProps } from "@/shared/models/types";

export interface RequisitesFormProps {
  entityType: "individual" | "sole_proprietor" | "company";
  entityId?: string;
}

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

export type EntityFormData = Record<string, string>;

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
