"use client"
import { Breadcrumbs } from "@/shared/entities/breadcrumbs"
import { Footer } from "@/shared/Ui/Footer"
import { Gap } from "@/shared/Ui/Gap"
import { Header } from "@/Widgets/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient();

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <>
                <div>
                    <Header />
                    <Gap size={16} />
                    <main>
                        <div className="container">
                            <Breadcrumbs />
                            {children}
                        </div>
                    </main>
                    <Gap size={16} />
                </div>
                <Footer />
            </>
        </QueryClientProvider>
    )
}