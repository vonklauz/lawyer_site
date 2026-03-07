"use client"

import { RequisitesFormPageWrapper } from "@/Widgets/RequisitesForm/RequisitesFormPageWrapper";
import { SearchParamsProvider } from "@/Widgets/SearchParamsProvider";
import { Suspense } from "react";

export default function FormPage() {

    return <Suspense>
        <SearchParamsProvider component={RequisitesFormPageWrapper} />
    </Suspense>
}