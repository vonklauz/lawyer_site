import {
  fetchSaveApiV1RequestedFieldsInstanceIdPost,
  SaveApiV1RequestedFieldsInstanceIdPostVariables,
} from "@/generated/lawyersSiteApiComponents";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { useCallback } from "react";

export const useSaveRequestedFields = (instanceId: string) => {
  const saveRequestedFields = useCallback(async () => {
    const variables: SaveApiV1RequestedFieldsInstanceIdPostVariables = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      } as unknown as SaveApiV1RequestedFieldsInstanceIdPostVariables["headers"],
      pathParams: { instanceId },
      body: { fields: [] },
    };
    const data = await fetchSaveApiV1RequestedFieldsInstanceIdPost(variables);
    return data;
  }, [instanceId]);

  const [result, isLoading] = useInterceptor(saveRequestedFields);

  return [result, isLoading];
};
