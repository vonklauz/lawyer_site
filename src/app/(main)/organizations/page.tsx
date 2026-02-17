"use client"
import { Gap } from "@/shared/Ui/Gap";
import { OrganizationsList } from "@/Widgets/OrganizationsList";
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