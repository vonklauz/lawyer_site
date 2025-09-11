import type { IInputProps } from ".";
import { MaskedInput } from "./MaskedInput";

export const PhoneInput = (props: IInputProps) => (
    <MaskedInput {...props} mask="+7 (___) ___-__-__" replacement={/\d/} showMask/>
)