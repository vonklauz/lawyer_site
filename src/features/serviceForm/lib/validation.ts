import { ServicesFieldType, ServicesOutputServiceFieldDTO } from "@/generated/lawyersSiteApiSchemas";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { AnySchema, boolean, number, object, string } from "yup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FIELD_SCHEMA_MAP: Record<ServicesFieldType, AnySchema> = {
  STRING: string() as AnySchema,
  INTEGER: number() as AnySchema,
  BOOL: boolean() as AnySchema,
  SELECT: string() as AnySchema,
  DATE: string() as AnySchema,
  URL: string().url("Введите корректный URL") as AnySchema,
  FILE: string() as AnySchema,
};

export const mapSchemaFromServiceFormData = (
  data: Pick<ServicesOutputServiceFieldDTO, "id" | "type" | "required">[],
) => {
  const schema: Record<string, AnySchema> = {};

  data.forEach(({ id = "title", type = "STRING", required }) => {
    let fieldSchema = FIELD_SCHEMA_MAP[type as ServicesFieldType] ?? (string() as AnySchema);
    if (required || id === "title") {
      fieldSchema = fieldSchema.required("Поле обязательно для заполнения") as AnySchema;
    }
    schema[id] = fieldSchema;
  });

  return object(schema);
};
