import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { skipToken } from "@tanstack/react-query";
import {
  useGetInstanceDetailApiV1ServiceInstancesDetailInstanceIdGet,
  useRotateRefreshTokenApiV1AuthJwtRotateRefreshPost,
} from "@/generated/lawyersSiteApiComponents";
import { handleLoginSuccess, handleLogoutSuccess } from "@/shared/lib";
import { UNAUTHORIZED_PATH } from "@/shared/lib/consts";

export const useGetInstanceFields = (instanceId: string) => {
  const [tries, setTries] = useState(0);
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const refreshToken =
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

  const queryVariables = accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        pathParams: { instanceId },
      }
    : skipToken;

  const {
    data: serviceInstancesData,
    error: serviceInstancesError,
    isPending: isServiceInstancesPending,
    refetch,
  } = useGetInstanceDetailApiV1ServiceInstancesDetailInstanceIdGet(
    //@ts-expect-error позже типизировать
    queryVariables,
  );

  const {
    mutate: refreshTokensRq,
    data: refreshTokensData,
    error: refreshTokensError,
    isPending: isRefreshTokensPending,
  } = useRotateRefreshTokenApiV1AuthJwtRotateRefreshPost();

  useEffect(() => {
    if (
      //@ts-expect-error позже типизировать
      serviceInstancesError?.error?.code === 401 &&
      tries < 1 &&
      refreshToken
    ) {
      setTries(tries + 1);
      refreshTokensRq({
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        body: {
          refresh_token: refreshToken,
        },
      });
    }
  }, [serviceInstancesError, refreshToken]);

  useEffect(() => {
    if (refreshTokensData?.success) {
      //@ts-expect-error позже типизировать
      handleLoginSuccess(refreshTokensData?.data);
      refetch();
    } else if (refreshTokensData?.success === false) {
      handleLogoutSuccess();
      router.push(UNAUTHORIZED_PATH);
    }
  }, [refreshTokensData]);

  return {
    data: serviceInstancesData,
    error: serviceInstancesError || refreshTokensError,
    isPending: isServiceInstancesPending || isRefreshTokensPending,
  };
};
