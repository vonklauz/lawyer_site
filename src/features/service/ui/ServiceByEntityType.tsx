"use client"

import { useMemo } from "react";
import { useGetService } from "../api/useGetService";
import { ServiceItem } from "@/entities/serviceItem";

export const ServiceByEntityType = ({chosenEntity}) => {
    
    const getChosenEntityType = useMemo(() => {
        if (!chosenEntity) {
            return;
        }
        return chosenEntity.ceo_name ? 'COMPANY' : chosenEntity.birth_date ? 'INDIVIDUAL' : 'SOLE_PROPRIETOR';
    }, [chosenEntity])

    const type = getChosenEntityType;
    console.log(type)
    const [response, isLoading] = useGetService(type) || {}
    const { data, error } = response;

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
        {data?.map((item) => (
            <ServiceItem key={item.id} {...item} link={`/service/form?serviceId=${item.id}`} linkText="Заказать"/>
        ))}
    </div>
}