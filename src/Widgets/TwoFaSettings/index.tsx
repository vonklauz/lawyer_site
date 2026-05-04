"use client";
import { ServiceItem } from "@/shared/Ui/ServiceItem";
import { TWO_FA_SETTINGS } from "./consts";
import { useCallback, useEffect, useState } from "react";
import { TwoFaModal } from "../TwoFaModal";
import {
  fetchGetUserByUserIdApiV1UserGet,
  GetUserByUserIdApiV1UserGetVariables,
} from "@generated/lawyersSiteApiComponents";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { Skeleton } from "@/shared/Ui/Skeleton";
import { TwoFaMode, TwoFaResponse } from "../TwoFaModal/model/types";

export const TwoFaSettings = () => {
  const [otpMethod, setOtpMethod] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<TwoFaMode | null>(null);
  const [isOpen, setOpen] = useState(false);

  const getUser2FaType = useCallback(async (): Promise<TwoFaResponse> => {
    const variables: GetUserByUserIdApiV1UserGetVariables = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      } as unknown as GetUserByUserIdApiV1UserGetVariables["headers"],
    };
    const data = await fetchGetUserByUserIdApiV1UserGet(variables);
    return data as unknown as TwoFaResponse;
  }, []);

  const [response, isLoading] = useInterceptor(getUser2FaType);

  useEffect(() => {
    const typedResponse = response as TwoFaResponse | undefined;
    if (typedResponse?.data?.method?.name) {
      setOtpMethod(typedResponse.data.method.name);
    }
  }, [response]);

  const onChange2FaMethod = (twoFaState: string, mode: string | null) => {
    if (twoFaState === "disable") {
      setOtpMethod(null);
    } else {
      setOtpMethod(mode);
    }
  };

  return (
    <div>
      <p className="text-center font-light">
        Для обеспечения безопасности мы рекомендуем использовать двухфакторную
        аутентификацию, это позволит снизить риски доступа третьих лиц к Вашему
        кабинету и оплату Ваших штрафов.{" "}
      </p>

      <div className="flex flex-wrap gap-5 lg:gap-15 justify-center mt-10">
        {isLoading ? (
          <div className="w-[53%]">
            <Skeleton className="h-[170px]" />
          </div>
        ) : (
          <>
            {TWO_FA_SETTINGS.map((item) => (
              <ServiceItem
                key={item.title}
                {...item}
                isChosenMethod={item.code === otpMethod}
                onClick={() => {
                  setModalMode(item.code as TwoFaMode);
                  setOpen(true);
                }}
              />
            ))}
          </>
        )}
      </div>
      <TwoFaModal
        isOpen={isOpen}
        mode={modalMode}
        isChosenMode={otpMethod === modalMode}
        handleClose={() => setOpen(false)}
        onChange2FaMethod={onChange2FaMethod}
      />
    </div>
  );
};
