import { Gap } from "@/ui/Components/Gap";
import { ServiceItem } from "@/ui/Components/ServiceItem";

export default function ServicePage() {
    return (
        <div>
            <h1>Заказать услугу</h1>
            <Gap size={20} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
                <ServiceItem
                    title="Консультация юриста"
                    description="Получите профессиональную юридическую консультацию."
                    linkText="Заказать"
                    link="/services/legal-consultation"
                />
                <ServiceItem
                    title="Консультация юриста"
                    description="Получите профессиональную юридическую консультацию."
                    linkText="Заказать"
                    link="/services/legal-consultation"
                />
                <ServiceItem
                    title="Консультация юриста"
                    description="Получите профессиональную юридическую консультацию."
                    linkText="Заказать"
                    link="/services/legal-consultation"
                />
                <ServiceItem
                    title="Консультация юриста"
                    description="Получите профессиональную юридическую консультацию."
                    linkText="Заказать"
                    link="/services/legal-consultation"
                />
                <ServiceItem
                    title="Консультация юриста"
                    description="Получите профессиональную юридическую консультацию."
                    linkText="Заказать"
                    link="/services/legal-consultation"
                />
                <ServiceItem
                    title="Консультация юриста"
                    description="Получите профессиональную юридическую консультацию."
                    linkText="Заказать"
                    link="/services/legal-consultation"
                />
                <ServiceItem
                    title="Консультация юриста"
                    description="Получите профессиональную юридическую консультацию."
                    linkText="Заказать"
                    link="/services/legal-consultation"
                />
            </div>
        </div>
    );
}