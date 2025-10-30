"use client"
import { useSearchParams } from "next/navigation";
import { RequisitesForm } from "../RequisitesForm";


const REQUISITES_FORM_TITLES = {
    individual: "Реквизиты физического лица",
    sole_proprietor: "Реквизиты ИП",
    company: "Реквизиты организации",
}


export const SearchParamsProvider = (props: any) => {
    const searchParams = useSearchParams();
    const entityType = searchParams.get("entityType") as "individual" | "sole_proprietor" | "company";
    const entityId = searchParams.get("entityId") as string;

    return <>
        <h2>{REQUISITES_FORM_TITLES[entityType]}</h2>
        <div className="flex justify-center mt-3 lg:mt-5">
            <div className="w-[100%] max-w-[500px]">
                <RequisitesForm entityType={entityType} entityId={entityId}/>
            </div>
        </div>
    </>
}