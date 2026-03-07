import { useGetByEntityIdApiV1ServicesGet } from "@/generated/lawyersSiteApiComponents";
import { ServicesEntityType } from "@/generated/lawyersSiteApiSchemas";

export const useGetService = (entityType: ServicesEntityType | undefined) => {

    const data = useGetByEntityIdApiV1ServicesGet({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        },
        queryParams: { entity_type: entityType }
    });

    return data?.data;
}