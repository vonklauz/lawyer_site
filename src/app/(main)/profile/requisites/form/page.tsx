"use client"
import { SearchParamsProvider } from "@/ui/Widgets/SearchParamsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
const queryClient = new QueryClient();


export default function FormPage() {

    return <QueryClientProvider client={queryClient}>
        <Suspense>
            <SearchParamsProvider />
        </Suspense>
    </QueryClientProvider>;
}