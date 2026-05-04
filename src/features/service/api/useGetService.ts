import {
  fetchGetByEntityIdApiV1ServicesGet,
  GetByEntityIdApiV1ServicesGetVariables,
} from "@/generated/lawyersSiteApiComponents";
import {
  ServicesEntityType,
  ServicesSuccessResponseListOutputServiceDTO,
} from "@/generated/lawyersSiteApiSchemas";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { useCallback } from "react";

export const useGetService = (
  entityType: ServicesEntityType | undefined,
): [ServicesSuccessResponseListOutputServiceDTO, boolean] => {
  const getServiceByEntitytype = useCallback(async () => {
    const variables: GetByEntityIdApiV1ServicesGetVariables = {
      headers: {
        // Сервер принимает Authorization, а не X-User-Id/X-User-Roles при прямом вызове
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      } as unknown as GetByEntityIdApiV1ServicesGetVariables["headers"],
      queryParams: { entity_type: entityType },
    };
    const data = await fetchGetByEntityIdApiV1ServicesGet(variables);
    return data;
  }, [entityType]);

  const [result, isLoading] = useInterceptor(getServiceByEntitytype);
  return [result as ServicesSuccessResponseListOutputServiceDTO, isLoading];
};
