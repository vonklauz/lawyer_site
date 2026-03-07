import { Gap } from "@/shared/Ui/Gap";
import { OrganizationsList } from "@/Widgets/OrganizationsList";

export default function OrganizationPage() {
    return (
        <div>
            <h1>Организации и физические лица</h1>
            <Gap size={32} />
            <OrganizationsList />
        </div>
    )
}