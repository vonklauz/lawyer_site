"use client"

import useEntitiesStore from "@/shared/Store/EntitiesSlice/useEntitiesStore";
import { useMemo } from "react";
import { useGetService } from "../api/useGetService";
import { ServiceItem } from "@/entities/serviceItem";

export const ServiceByEntityType = () => {
    const chosenEntity = useEntitiesStore((state) => state.chosenEntity);

    const getChosenEntityType = useMemo(() => {
        if (!chosenEntity) {
            return;
        }
        return chosenEntity.ceo_name ? 'COMPANY' : chosenEntity.birth_date ? 'INDIVIDUAL' : 'SOLE_PROPRIETOR';
    }, [chosenEntity])

    const type = getChosenEntityType;
    const rs = useGetService(type) || {}
    const { data } = rs;

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
        {!chosenEntity && <p>Создайте или выберите тип профиля</p>}
        {data?.map((item) => (
            <ServiceItem key={item.id} {...item} linkText="Заказать"/>
        ))}
    </div>
}