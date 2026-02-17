"use client"
import useEntitiesStore from "@/Store/useEntitiesStore";
import { handleLoginSuccess, handleLogoutSuccess, isSkipToken } from "@/Utils";
import { useRotateAuthRotateTokensPost } from "@generated/lawyersSiteApiComponents";
import { SkipToken } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IBaseSuccessResponse } from "@/Models";

export const useInterceptor = <T extends IBaseSuccessResponse<any>>(request: (() => Promise<T>) | SkipToken): [T | IBaseSuccessResponse<any>, boolean] => {
    const [tries, setTries] = useState(0);
    const [isPropRequestLoading, setIsPropRequestLoading] = useState(true);
    const [propRequestResponse, setPropRequestResponse] = useState<T | IBaseSuccessResponse<any>>({} as T);
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
        const response = propRequestResponse as any;
        if (response?.error?.code === 403) {
            if (tries < 3) {
                refreshTokens();
                setIsPropRequestLoading(false);
            }
        }
        if (response?.success) {
            setIsPropRequestLoading(false);
        }
    }, [propRequestResponse])

    useEffect(() => {
        const data = refreshTokensData as any;
        if (data?.error) {
            setTries(tries + 2);
            clearEntities();
            handleLogoutSuccess();
            return;
        }
        if (data?.data) {
            handleLoginSuccess(data?.data)
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