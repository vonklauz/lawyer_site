import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { REDIRECT_TIMING } from "~/Consts";
import { useVerifyEmailMutation } from "~/Service/authApi"

export const ConfirmForm = ({ confirmToken }: { confirmToken: string }) => {
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [verifyToken, resultVerifyToken] = useVerifyEmailMutation();
    
    useEffect(() => {
        if (confirmToken) {
            verifyToken({ token: confirmToken });
        }
    }, [confirmToken])

    useEffect(() => {
        if (resultVerifyToken.data?.success) {
            setSuccess(true)
            setTimeout(() => {
                navigate('/login')
            }, REDIRECT_TIMING)
        } else if (resultVerifyToken.isError) {
            setError(true)
        }
    }, [resultVerifyToken])

    const getContent = () => {

        if (isSuccess) {
            return 'Профиль успешно активирован! Через 3 секунды Вы будете перенаправлены на страницу входа...'
        }

        if (isError) {
            return (
                <div className="flex-column">
                    <p>
                        Ссылка недействительна или устарела.
                    </p>
                    <p className="mt-3 underline">
                        <a href="/">Вернуться на главную страницу</a>
                    </p>
                </div>
            )
        }

        return 'Загрузка...';
    }


    return (
        <div className="flex justify-center items-center p-4" style={{ height: '45vh' }}>{getContent()}</div>
    )
}