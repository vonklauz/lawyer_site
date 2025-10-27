"use client"
import { RequisitesForm } from "@/ui/Widgets/RequisitesForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
const queryClient = new QueryClient();

const REQUISITES_FORM_TITLES = {
    individual: "Реквизиты физического лица",
    sole_proprietor: "Реквизиты ИП",
    company: "Реквизиты организации",
}


export default function FormPage() {
    const searchParams = useSearchParams();
    const entityType = searchParams.get("entityType") as "individual" | "sole_proprietor" | "company";
    console.log(entityType);

    return <QueryClientProvider client={queryClient}>
        <h2>{REQUISITES_FORM_TITLES[entityType]}</h2>
        <div className="flex justify-center mt-3 lg:mt-5">
            <div className="w-[100%] max-w-[500px]">
                <RequisitesForm entityType={entityType} />
            </div>
        </div>
    </QueryClientProvider>;
}