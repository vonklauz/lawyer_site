"use client";
import { UserThumb } from "./UserThumb";
import { useCallback, useEffect, useState } from "react";
import {
  fetchGetAllEntitiesApiV1EntitiesGet,
  GetAllEntitiesApiV1EntitiesGetVariables,
} from "@generated/lawyersSiteApiComponents";
import useEntitiesStore, {
  isEmptyEntities,
} from "@/shared/Store/EntitiesSlice/useEntitiesStore";
import { skipToken } from "@tanstack/react-query";
import { isSkipToken } from "@/shared/lib";
import { UserEntitiesResponse } from "./model/types";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { Entities } from "@/shared/Store/EntitiesSlice/models";

export const UserComponent = () => {
  const hasHydrated = useEntitiesStore((state) => state.hasHydrated);
  const entities = useEntitiesStore((state) => state.entities);
  const setEntities = useEntitiesStore((state) => state.setEntities);
  const [isAuthorized, setIsAuthorized] = useState<undefined | boolean>();

  const getUserEntities = useCallback(async () => {
    const variables: GetAllEntitiesApiV1EntitiesGetVariables = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      } as unknown as GetAllEntitiesApiV1EntitiesGetVariables["headers"],
    };
    const data = await fetchGetAllEntitiesApiV1EntitiesGet(variables);
    return data;
  }, []);

  const getEntitiesRq = hasHydrated
    ? isEmptyEntities(entities)
      ? getUserEntities
      : skipToken
    : skipToken;

  const [response, isLoading] = useInterceptor(
    getEntitiesRq as (() => Promise<UserEntitiesResponse>) | typeof skipToken,
  );
  const isRenderSkeleton = isLoading || !hasHydrated;

  useEffect(() => {
    if (hasHydrated && isSkipToken(getEntitiesRq)) {
      setIsAuthorized(true);
    }
  }, [hasHydrated, getEntitiesRq]);

  useEffect(() => {
    if (response?.success && response?.data) {
      setEntities({ ...response.data } as Entities);
      setIsAuthorized(true);
    }
    if (response?.error) {
      setIsAuthorized(false);
    }
  }, [response]);

  if (isRenderSkeleton) {
    return (
      <div className="animate-pulse w-[100%] h-[100%] bg-gray-200 rounded" />
    );
  }

  return <UserThumb options={entities} isAuthorized={isAuthorized} />;
};
