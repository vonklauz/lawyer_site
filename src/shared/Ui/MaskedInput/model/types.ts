import { IInputProps } from "../../Input";
import type { Replacement } from "@react-input/mask";

export interface IMaskedInputProps extends Omit<IInputProps, "value"> {
  mask?: string;
  replacement: Replacement;
  showMask?: boolean;
  value: string | number;
}
