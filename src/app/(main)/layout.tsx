import { Footer } from "@/ui/Components/Footer"
import { Header } from "@/ui/Components/Header"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <Header />
        <main>{children}</main>
        <Footer/>
    </>
}