import { fetchSaveApiV1RequestedFieldsInstanceIdPost } from "@/generated/lawyersSiteApiComponents";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { useCallback } from "react";

export const useSaveRequestedFields = (serviceId: string) => {
  const saveRequestedFields = useCallback(async () => {
    const data = await fetchSaveApiV1RequestedFieldsInstanceIdPost({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      pathParams: { serviceId },
    });
    return data;
  }, [serviceId]);

  const [result, isLoading] = useInterceptor(saveRequestedFields);

  return [result, isLoading];
};
