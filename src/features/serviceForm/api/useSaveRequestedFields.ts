import { fetchSaveApiV1RequestedFieldsInstanceIdPost } from "@/generated/lawyersSiteApiComponents";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { useCallback } from "react";

export const useSaveRequestedFields = (serviceId: string) => {
  const saveRequestedFields = useCallback(async () => {
    const data = await fetchSaveApiV1RequestedFieldsInstanceIdPost({
      headers: {
        //@ts-expect-error позже типизировать
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      //@ts-expect-error позже типизировать
      pathParams: { serviceId },
    });
    return data;
  }, [serviceId]);

  //@ts-expect-error позже типизировать
  const [result, isLoading] = useInterceptor(saveRequestedFields);

  return [result, isLoading];
};
