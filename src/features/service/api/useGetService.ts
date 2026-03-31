import { fetchGetByEntityIdApiV1ServicesGet } from "@/generated/lawyersSiteApiComponents";
import { ServicesEntityType } from "@/generated/lawyersSiteApiSchemas";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { useCallback } from "react";

export const useGetService = (entityType: ServicesEntityType | undefined) => {
  const getServiceByEntitytype = useCallback(async () => {
    const data = await fetchGetByEntityIdApiV1ServicesGet({
      headers: {
        //@ts-expect-error позже типизировать
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      queryParams: { entity_type: entityType },
    });
    return data;
  }, [entityType]);
  //@ts-expect-error позже типизировать
  const [result, isLoading] = useInterceptor(getServiceByEntitytype);
  return [result, isLoading];
};
