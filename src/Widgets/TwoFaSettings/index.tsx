"use client";
import { ServiceItem } from "@/shared/Ui/ServiceItem";
import { TWO_FA_SETTINGS } from "./consts";
import { useEffect, useState } from "react";
import { TwoFaModal } from "../TwoFaModal";
import {
    fetchGetUserByUserId2faUsersGet,
} from "@generated/lawyersSiteApiComponents";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { Skeleton } from "@/shared/Ui/Skeleton";
import { TwoFaResponse, TwoFaMode } from "../TwoFaModal/lib/types";

export const TwoFaSettings = () => {
    const [otpMethod, setOtpMethod] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<TwoFaMode | null>(null);
    const [isOpen, setOpen] = useState(false);

    const getUser2FaType = async (): Promise<TwoFaResponse> => {
        const data = await fetchGetUserByUserId2faUsersGet({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return data as unknown as TwoFaResponse;
    }
    const [response, isLoading] = useInterceptor<TwoFaResponse>(getUser2FaType);

    useEffect(() => {
        if (response?.data?.method?.name) {
            setOtpMethod(response?.data?.method.name)
        }
    }, [response])

    const onChange2FaMethod = (twoFaState: string, mode: string | null) => {
        if (twoFaState === 'disable') {
            setOtpMethod(null);
        }

        else {
            setOtpMethod(mode)
        }
    }

    return <div>
        <p className="text-center font-light">Для обеспечения безопасности мы рекомендуем использовать двухфакторную аутентификацию,
            это позволит снизить риски доступа третьих лиц к Вашему кабинету и оплату Ваших штрафов. </p>

        <div className="flex flex-wrap gap-5 lg:gap-15 justify-center mt-10">
            {isLoading ? <div className="w-[53%]"><Skeleton className="h-[170px]" /></div> : <>
                {
                    TWO_FA_SETTINGS.map((item) => (
                        <ServiceItem
                            key={item.title}
                            {...item}
                            isChosenMethod={item.code === otpMethod}
                            onClick={() => {
                                setModalMode(item.code as TwoFaMode)
                                setOpen(true)
                            }}
                        />
                    ))
                }
            </>
            }

        </div>
        <TwoFaModal isOpen={isOpen} mode={modalMode} isChosenMode={otpMethod === modalMode} handleClose={() => setOpen(false)} onChange2FaMethod={onChange2FaMethod} />
    </div>
}