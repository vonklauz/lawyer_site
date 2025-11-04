"use client"
import { Gap } from "@/ui/Components/Gap";
import { OrganizationsList } from "@/ui/Widgets/OrganizationsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function OrganizationPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <h1>Организации и физические лица</h1>
                <Gap size={32} />
                <OrganizationsList />
            </div>
        </QueryClientProvider>
    )
}