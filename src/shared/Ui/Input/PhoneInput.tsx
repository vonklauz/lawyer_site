import type { IInputProps } from ".";
import { MaskedInput } from "../MaskedInput";

export const PhoneInput = (props: IInputProps) => (
  //@ts-ignore позже типизировать
  <MaskedInput
    {...props}
    mask="+7 (___) ___-__-__"
    replacement={{ d: /\d/ }}
    showMask
  />
);
