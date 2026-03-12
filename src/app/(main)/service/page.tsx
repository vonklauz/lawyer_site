"use client"

import { ServiceByEntityType } from "@/features/service";
import useEntitiesStore from "@/shared/Store/EntitiesSlice/useEntitiesStore";
import { Gap } from "@/shared/Ui/Gap";
import { ServiceItem } from "@/shared/Ui/ServiceItem";

export default function ServicePage() {
    const chosenEntity = useEntitiesStore((state) => state.chosenEntity);
    const hasHydrated = useEntitiesStore((state) => state.hasHydrated);

    return (
        <>
            <h1>Заказать услугу</h1>
            <Gap size={20} />
            {!chosenEntity && hasHydrated && <p>Создайте или выберите тип профиля</p>}
            {chosenEntity && <ServiceByEntityType chosenEntity={chosenEntity}/>}
        </>
    );
}