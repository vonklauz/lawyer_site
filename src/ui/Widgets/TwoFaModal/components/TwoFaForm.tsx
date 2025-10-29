"use client";
import { Button } from "@/ui/Components/Button";
import {
    useActivation2faEmailActivationPost,
    useActivation2faEmailDeactivatePost,
    useActivation2faTotpActivationPost,
    useActivation2faTotpDeactivatePost
} from "@generated/lawyersSiteApiComponents";
import { useEffect, useState } from "react";

interface TwoFaFormProps {
    mode: string | null;
    isChosenMode: boolean;
    handleClose: () => void;
    onChange2FaMethod: (twoFaState: string, mode: string | null) => void;
}

const config = {
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
            disable: 'Отключить двухфакторную аутентификацию через приложение-генератор кодов?',
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
    const [qrCode, setQrCode] = useState(null);
    const activateState = isChosenMode ? 'disable' : 'enable';
    /**@ts-expect-error позже типизировать */
    const { mutate, data, isPending } = config[mode].method[activateState]();
    console.log(isPending)

    useEffect(() => {
        if (data?.success) {
            if (activateState === 'disable') {
                handleClose();
                onChange2FaMethod(activateState, mode);
            } else {
                if (data?.data?.qr) {
                    setQrCode(data?.data?.qr);
                }
            }

        }
    }, [data]);

    const handleSubmit = () => {
        mutate({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    };

    return (
        <div className="flex flex-col gap-5 p-4">
            {/**@ts-expect-error позже типизировать */}
            {!qrCode ? <p className="text-center">{config[mode].title[activateState]}</p> : <p className="text-center">{config[mode].scan}</p>}
            {data?.error?.message && <p className="text-center text-sm red-font mt-1">{data?.error?.message}</p>}
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
                {/**@ts-expect-error позже типизировать */}
                {!qrCode ? config[mode].button[activateState] : config[mode].button.close}
            </Button>
        </div>
    );
}
