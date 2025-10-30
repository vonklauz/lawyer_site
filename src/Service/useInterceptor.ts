"use client"
import useEntitiesStore from "@/Store/useEntitiesStore";
import { handleLoginSuccess, handleLogoutSuccess, isSkipToken } from "@/Utils";
import { useRotateAuthRotateTokensPost } from "@generated/lawyersSiteApiComponents";
import { SkipToken } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useInterceptor = (request: (() => Promise<any>) | SkipToken) => {
    const [tries, setTries] = useState(0);
    const [isPropRequestLoading, setIsPropRequestLoading] = useState(true);
    const [propRequestResponse, setPropRequestResponse] = useState({});
    const clearEntities = useEntitiesStore((state) => state.clearEntities);
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
        if (isSkipToken(request)) {
            return;
        }
        const data = await request();
        setPropRequestResponse(data);
    };

    useEffect(() => {
        if (isSkipToken(request)) {
            setIsPropRequestLoading(false);
            return;
        }
        if (tries === 0) {
            fetchData();
            setTries(1);
        }

    }, [request, tries]);

    useEffect(() => {
        //@ts-expect-error позже типизировать
        if (propRequestResponse?.error?.code === 403) {
            if (tries < 3) {
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
            clearEntities();
            handleLogoutSuccess();
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