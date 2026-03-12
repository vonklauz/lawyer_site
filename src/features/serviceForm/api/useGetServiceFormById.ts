import { fetchGetByServiceIdApiV1ServiceFieldsServiceServiceIdGet } from "@/generated/lawyersSiteApiComponents";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import { useCallback } from "react";

export const useGetServiceFormById = (serviceId: string) => {
    const getServiceByEntitytype = useCallback(async () => {
        const data = await fetchGetByServiceIdApiV1ServiceFieldsServiceServiceIdGet({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            pathParams: { serviceId }
        });
        return data;
    }, [serviceId]);

    const [result, isLoading] = useInterceptor(getServiceByEntitytype);

    return [result, isLoading];
}