"use client";
import { ServiceItem } from "@/ui/Components/ServiceItem";
import { TWO_FA_SETTINGS } from "./consts";
import { useState } from "react";
import { TwoFaModal } from "../TwoFaModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export const TwoFaSettings = () => {
    const [isOpen, setOpen] = useState(false);
    return <QueryClientProvider client={queryClient}><div>
        <p className="text-center font-light">Для обеспечения безопасности мы рекомендуем использовать двухфакторную аутентификацию,
            это позволит снизить риски доступа третьих лиц к Вашему кабинету и оплату Ваших штрафов. </p>
        <div className="flex flex-wrap gap-5 lg:gap-15 justify-center mt-10">
            {TWO_FA_SETTINGS.map((item) => (
                <ServiceItem
                    key={item.title}
                    {...item}
                    onClick={() => setOpen(true)}
                />
            ))}
            <TwoFaModal isOpen={isOpen} />
        </div>
    </div></QueryClientProvider>
}