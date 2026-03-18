import { fetchGetApiV1ServiceInstancesGet } from "@/generated/lawyersSiteApiComponents";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { useCallback } from "react";

export const useGetInstanceId = (serviceId: string) => {
  const saveRequestedFields = useCallback(async () => {
    const data = await fetchGetApiV1ServiceInstancesGet({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      queryParams: { service_id: serviceId },
    });
    return data;
  }, [serviceId]);

  const [result, isLoading] = useInterceptor(saveRequestedFields);

  return [result, isLoading];
};
