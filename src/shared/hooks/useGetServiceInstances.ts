import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { skipToken } from "@tanstack/react-query";
import {
  GetUserInstancesWithServicesApiV1ServiceInstancesUserGetVariables,
  useGetUserInstancesWithServicesApiV1ServiceInstancesUserGet,
  useRotateRefreshTokenApiV1AuthJwtRotateRefreshPost,
} from "@/generated/lawyersSiteApiComponents";
import { handleLoginSuccess, handleLogoutSuccess } from "../lib";
import { UNAUTHORIZED_PATH } from "../lib/consts";
import { AuthLoginResponseDTO } from "@/generated/lawyersSiteApiSchemas";

export const useGetServiceInstances = () => {
  const [tries, setTries] = useState(0);
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const refreshToken =
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;

  const queryVariables: GetUserInstancesWithServicesApiV1ServiceInstancesUserGetVariables | typeof skipToken =
    accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          } as unknown as GetUserInstancesWithServicesApiV1ServiceInstancesUserGetVariables["headers"],
        }
      : skipToken;

  const {
    data: serviceInstancesData,
    error: serviceInstancesError,
    isPending: isServiceInstancesPending,
    refetch,
  } = useGetUserInstancesWithServicesApiV1ServiceInstancesUserGet(
    queryVariables,
  );

  const {
    mutate: refreshTokensRq,
    data: refreshTokensData,
    error: refreshTokensError,
    isPending: isRefreshTokensPending,
  } = useRotateRefreshTokenApiV1AuthJwtRotateRefreshPost();

  useEffect(() => {
    const error = serviceInstancesError as { error?: { code?: number } } | null;
    if (error?.error?.code === 401 && tries < 1 && refreshToken) {
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
      handleLoginSuccess(refreshTokensData?.data as AuthLoginResponseDTO);
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
