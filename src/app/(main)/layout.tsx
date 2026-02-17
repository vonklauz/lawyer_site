import { Footer } from "@/shared/Ui/Footer"
import { Gap } from "@/shared/Ui/Gap"
import { Breadcrumbs } from "@/Widgets/Breadcrumbs"
import { Header } from "@/Widgets/Header"

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