"use client"
import { AuthForm } from "@/ui/Widgets/AuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function LoginPage() {
    return <QueryClientProvider client={queryClient}><AuthForm mode="login" /></QueryClientProvider>;
}