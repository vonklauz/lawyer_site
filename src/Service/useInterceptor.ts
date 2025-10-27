"use client"
import { handleLoginSuccess, handleLogoutSuccess } from "@/Utils";
import { useRotateAuthRotateTokensPost } from "@generated/lawyersSiteApiComponents";
import { useEffect, useState } from "react";

export const useInterceptor = (request: () => Promise<any>) => {
    const [tries, setTries] = useState(1);
    const [isPropRequestLoading, setIsPropRequestLoading] = useState(true);
    const [propRequestResponse, setPropRequestResponse] = useState({});
    const rq = useRotateAuthRotateTokensPost();
    const { mutate: refreshTokensRq, data: refreshTokensData, error: refreshTokensError, isPending: isRefreshTokensPending } = rq;
    const isLoading = isRefreshTokensPending || isPropRequestLoading;

    const refreshTokens = () => {
        refreshTokensRq({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
            }
        })
    }

    const fetchData = async () => {
        const data = await request();
        setPropRequestResponse(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        //@ts-expect-error позже типизировать
        if (propRequestResponse?.error?.code === 403) {
            if (tries < 2) {
                refreshTokens();
                setIsPropRequestLoading(false);
            }
        }
        //@ts-expect-error позже типизировать
        if (propRequestResponse?.success) {
            setIsPropRequestLoading(false);
        }
    }, [propRequestResponse])

    useEffect(() => {
        //@ts-expect-error позже типизировать
        if (refreshTokensData?.error) {
            setTries(tries + 2);
            handleLogoutSuccess()
            return;
        }
        //@ts-expect-error позже типизировать
        if (refreshTokensData?.data) {
            //@ts-expect-error позже типизировать
            handleLoginSuccess(refreshTokensData?.data)
            setTries(tries + 1);
        }
    }, [refreshTokensData])

    useEffect(() => {
        if (tries === 2) {
            fetchData();
            setIsPropRequestLoading(false);
        }
    }, [tries])

    return [propRequestResponse, isLoading]
}