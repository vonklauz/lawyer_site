import { ServiceItem } from "@/ui/Components/ServiceItem";
import Link from "next/link";
import { PROFILE_SETTINGS } from "./consts";

export const ProfileSettings = () => {
    return <div>
        <p className="text-center font-light">Заполните реквизиты и выберите тип аутентификации</p>
        <div className="flex flex-wrap gap-5 lg:gap-15 justify-center mt-10">
            {PROFILE_SETTINGS.map((item) => (
                <ServiceItem
                    key={item.link}
                    {...item}
                />
            ))}

        </div>
    </div>;
}