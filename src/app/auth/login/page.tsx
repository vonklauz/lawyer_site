"use client"
import { Login } from "@/features/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function LoginPage() {
    return <QueryClientProvider client={queryClient}><Login /></QueryClientProvider>;
}