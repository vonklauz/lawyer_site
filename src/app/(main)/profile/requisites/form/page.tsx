"use client"

import { RequisitesFormPageWrapper } from "@/Widgets/RequisitesForm/RequisitesFormPageWrapper";
import { SearchParamsProvider } from "@/Widgets/SearchParamsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
const queryClient = new QueryClient();

export default function FormPage() {

    return <QueryClientProvider client={queryClient}>
        <Suspense>
            <SearchParamsProvider component={RequisitesFormPageWrapper} />
        </Suspense>
    </QueryClientProvider>;
}