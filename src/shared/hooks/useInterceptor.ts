"use client";

import useEntitiesStore from "@/shared/Store/EntitiesSlice/useEntitiesStore";
import { handleLoginSuccess, handleLogoutSuccess, isSkipToken } from "@/shared/lib";
import { useRotateRefreshTokenApiV1AuthJwtRotateRefreshPost } from "@generated/lawyersSiteApiComponents";
import { SkipToken } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IBaseSuccessResponse } from "@/shared/models/types";

type ApiResponse = { success?: boolean; data?: unknown; error?: { code?: number } };

export const useInterceptor = <T extends { success?: boolean; data?: unknown; error?: { code?: number } }>(
  request: (() => Promise<T>) | SkipToken,
): [T | { success?: boolean; data?: unknown; error?: { code?: number } }, boolean] => {
  const [tries, setTries] = useState(0);
  const [isPropRequestLoading, setIsPropRequestLoading] = useState(true);
  const [propRequestResponse, setPropRequestResponse] = useState<
    T | { success?: boolean; data?: unknown; error?: { code?: number } }
  >({} as T);
  const clearEntities = useEntitiesStore((state) => state.clearEntities);
  const rq = useRotateRefreshTokenApiV1AuthJwtRotateRefreshPost();
  const {
    mutate: refreshTokensRq,
    data: refreshTokensData,
    isPending: isRefreshTokensPending,
  } = rq;
  const isLoading = isRefreshTokensPending || isPropRequestLoading;

  const refreshTokens = () => {
    const refreshToken = localStorage.getItem("refreshToken") || "";
    refreshTokensRq({
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      body: {
        refresh_token: refreshToken,
      },
    });
  };

  const fetchData = async () => {
    if (isSkipToken(request)) {
      return;
    }
    try {
      setIsPropRequestLoading(true);
      const data = await (request as () => Promise<T>)();
      setPropRequestResponse(data);
    } catch (error) {
      setPropRequestResponse(error as IBaseSuccessResponse<unknown>);
      setIsPropRequestLoading(false);
    }
  };

  useEffect(() => {
    setTries(0);
  }, [request]);

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
    const response = propRequestResponse as ApiResponse;
    if (response?.error?.code === 401) {
      if (tries < 3) {
        refreshTokens();
        setIsPropRequestLoading(false);
      }
    }
    if (response?.success) {
      setIsPropRequestLoading(false);
    }
  }, [propRequestResponse]);

  useEffect(() => {
    const data = refreshTokensData as { error?: unknown; data?: unknown; success?: boolean } | undefined;
    if (data?.error) {
      setTries(tries + 2);
      clearEntities();
      handleLogoutSuccess();
      return;
    }
    if (data?.data) {
      handleLoginSuccess(data.data as Parameters<typeof handleLoginSuccess>[0]);
      setTries(tries + 1);
    }
  }, [refreshTokensData]);

  useEffect(() => {
    if (tries === 2) {
      fetchData();
      setIsPropRequestLoading(false);
    }
  }, [tries]);

  return [propRequestResponse, isLoading];
};
