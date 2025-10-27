import { ServiceItem } from "@/ui/Components/ServiceItem";
import Link from "next/link";
import { REQUISITES_SETTINGS } from "./consts";

export const RequisitesSettings = () => {
    return <div>
        <p className="text-center font-light">Выберите тип реквизитов для формирования документов. Реквизиты можно отредактировать не чаще раза в месяц,
            либо по запросу через техподдержку. Могут быть заполнены все виды, но не более одного на каждый (за исключение кабинетов Агента Богатов Групп),
            более подробно в разделе <Link className="red-font" href="#">Кабинет Агента</Link>.</p>
        <div className="flex flex-wrap gap-5 lg:gap-15 justify-center mt-10">
            {REQUISITES_SETTINGS.map((item) => (
                <ServiceItem
                    key={item.link}
                    {...item}
                />
            ))}

        </div>
    </div>;
}