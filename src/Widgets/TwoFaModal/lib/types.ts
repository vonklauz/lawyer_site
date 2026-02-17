/**
 * Типы для TwoFa компонентов
 * Следуют правилам Feature-Sliced Design (FSD)
 */

import { IBaseSuccessResponse } from "@/Models";

export interface TwoFaMethod {
  name: string;
}

export interface TwoFaUser {
  method: TwoFaMethod;
}

export interface TwoFaResponse extends IBaseSuccessResponse<TwoFaUser> {
  data: TwoFaUser;
}

export interface QrCodeData {
  qr?: string;
}

export interface TwoFaActivationResponse extends IBaseSuccessResponse<QrCodeData> {
  data: QrCodeData;
}

export type TwoFaMode = "totp" | "email";
export type TwoFaActivateState = "enable" | "disable";

export interface TwoFaConfig {
  title: {
    enable: string;
    disable: string;
  };
  button: {
    enable: string;
    disable: string;
    close: string;
  };
  method: {
    enable: () => any;
    disable: () => any;
  };
  scan: string;
}

export interface TwoFaFormProps {
  mode: TwoFaMode | null;
  isChosenMode: boolean;
  handleClose: () => void;
  onChange2FaMethod: (twoFaState: string, mode: TwoFaMode | null) => void;
}
