"use client"
import { TwoFaSettings } from "@/ui/Widgets/TwoFaSettings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function TwoFaPage() {
    return <QueryClientProvider client={queryClient}><TwoFaSettings /></QueryClientProvider>;
}