import { ServiceByEntityType } from "@/features/service";
import { Gap } from "@/shared/Ui/Gap";
import { ServiceItem } from "@/shared/Ui/ServiceItem";

export default function ServicePage() {
    return (
        <>
            <h1>Заказать услугу</h1>
            <Gap size={20} />
            <ServiceByEntityType />
        </>
    );
}