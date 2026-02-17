import { FC } from "react";
import { RequisitesForm } from "../RequisitesForm";
import { RequisitesFormProps } from "./models";

const REQUISITES_FORM_TITLES = {
    individual: "Реквизиты физического лица",
    sole_proprietor: "Реквизиты ИП",
    company: "Реквизиты организации",
}

export const RequisitesFormPageWrapper: FC<RequisitesFormProps> = ({ entityType, entityId }) => (
    <>
        <h2>{REQUISITES_FORM_TITLES[entityType]}</h2>
        <div className="flex justify-center mt-3 lg:mt-5">
            <div className="w-[100%] max-w-[500px]">
                <RequisitesForm entityType={entityType} entityId={entityId} />
            </div>
        </div>
    </>
)