import { useSuspenseGetByEntityIdApiV1ServicesGet } from "@/generated/lawyersSiteApiComponents";
import { ServicesEntityType } from "@/generated/lawyersSiteApiSchemas";

export const useGetService = (entity_type: ServicesEntityType | undefined) => {
    const data = useSuspenseGetByEntityIdApiV1ServicesGet({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        },
        queryParams: { entity_type }
    });

    return data;
}