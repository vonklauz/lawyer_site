"use client";

import { ServiceForm } from "@/features/serviceForm";
import { SearchParamsProvider } from "@/Widgets/SearchParamsProvider";
import { Suspense } from "react";

export default function ServiceFormPage() {
    return <Suspense>
        <SearchParamsProvider component={ServiceForm} />
    </Suspense>
}