import { ObjectWithProps } from "@/shared/models/types";
import { ServiceFormFieldType } from "../model/types";
import { boolean, number, object, string } from "yup";

export const mapSchemaFromServiceFormData = (data: ServiceFormFieldType[]) => {
  const schema: ObjectWithProps = {};
  const config = {
    STRING: string(),
    INTEGER: number(),
    BOOL: boolean(),
    SELECT: string(),
    DATE: string(),
  };
  data.forEach(({ id, type, required }) => {
    let fieldSchema = config[type];
    if (required) {
      fieldSchema = fieldSchema.required("Поле обязательно для заполнения");
    }
    schema[id] = fieldSchema;
  });
  return object(schema);
};
