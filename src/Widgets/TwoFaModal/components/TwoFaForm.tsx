"use client";
import { Button } from "@/shared/Ui/Button";
import {
    useActivation2faEmailActivationPost,
    useActivation2faEmailDeactivatePost,
    useActivation2faTotpActivationPost,
    useActivation2faTotpDeactivatePost
} from "@generated/lawyersSiteApiComponents";
import { useEffect, useState } from "react";
import { TwoFaFormProps, TwoFaConfig, TwoFaMode, TwoFaActivationResponse } from "../model/types";

const config: Record<TwoFaMode, TwoFaConfig> = {
    totp: {
        title: {
            enable: 'Подключить двухфакторную аутентификацию через приложение-генератор кодов?',
            disable: 'Отключить двухфакторную аутентификацию через приложение-генератор кодов?',
        },
        button: {
            enable: 'Подключить',
            disable: 'Отключить',
            close: 'Закрыть',
        },
        method: {
            enable: useActivation2faTotpActivationPost,
            disable: useActivation2faTotpDeactivatePost
        },
        scan: 'Отсканируйте QR-код через приложение-генератор кодов',

    },
    email: {
        title: {
            enable: 'Подключить двухфакторную аутентификацию по электронной почте?',
            disable: 'Отключить двухфакторную аутентификацию по электронной почте?',
        },
        button: {
            enable: 'Подключить',
            disable: 'Отключить',
            close: 'Закрыть',
        },
        method: {
            enable: useActivation2faEmailActivationPost,
            disable: useActivation2faEmailDeactivatePost
        },
        scan: ''

    }
}

export const TwoFaForm = ({ mode, isChosenMode, onChange2FaMethod, handleClose }: TwoFaFormProps) => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const activateState = isChosenMode ? 'disable' : 'enable';
    const selectedMode: TwoFaMode = (mode as TwoFaMode) || 'email';
    const { mutate, data, isPending } = config[selectedMode].method[activateState as keyof typeof config[TwoFaMode]['method']]();
    const activationData = data as TwoFaActivationResponse | undefined;
    console.log(isPending)

    useEffect(() => {
        if (activationData?.success) {
            if (activationData?.data?.qr) {
                setQrCode(activationData?.data?.qr);
            } else {
                handleClose();
            }

            onChange2FaMethod(activateState, selectedMode);
        }
    }, [activationData]);

    const handleSubmit = () => {
        mutate({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    };

    return (
        <div className="flex flex-col gap-5 p-4">
            {!qrCode ? <p className="text-center">{config[selectedMode].title[activateState as keyof TwoFaConfig['title']]}</p> : <p className="text-center">{config[selectedMode].scan}</p>}
            {activationData?.error?.message && <p className="text-center text-sm red-font mt-1">{activationData?.error?.message}</p>}
            {qrCode && <div className="flex justify-center"><img
                src={`data:image/png;base64,${qrCode}`}
                className="w-40 h-40 object-contain border rounded-lg"
                alt="QR Код" /></div>
            }
            <Button
                type="button"
                className="mt-2 h-11 text-base"
                onClick={isPending ? () => { } : !qrCode ? handleSubmit : handleClose}
                disabled={isPending}
            >
                {!qrCode ? config[selectedMode].button[activateState as keyof TwoFaConfig['button']] : config[selectedMode].button.close}
            </Button>
        </div>
    );
}
