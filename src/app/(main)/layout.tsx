import { Footer } from "@/ui/Components/Footer"
import { Gap } from "@/ui/Components/Gap"
import { Breadcrumbs } from "@/ui/Widgets/Breadcrumbs"
import { Header } from "@/ui/Widgets/Header"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
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
}