"use client"
import { Register } from "@/features/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RegisterPage() {
    return <QueryClientProvider client={queryClient}><Register /></QueryClientProvider>;
}