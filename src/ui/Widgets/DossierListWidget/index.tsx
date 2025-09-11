import { InfoBlock } from "~/Components/InfoBlock"
import { InfoBlockContainer } from "~/Components/InfoBlock/InfoBlockContainer"
import { InfoBlockSkeleton } from "~/Components/Skeleton/InfoBlockSkeleton";
import { useGetFormSchemasQuery } from "~/Service/dossierApi";

export const DossierListWidget = () => {
    const { data: formSchema, isLoading } = useGetFormSchemasQuery();

    const renderContent = () => {
        if (isLoading) {
            return (
                <>
                    <InfoBlockSkeleton />
                    <InfoBlockSkeleton />
                    <InfoBlockSkeleton />
                </>
            )
        }

        return (
            formSchema?.data.map(({ form_title: title, form_description: description, schema_id: id }) => (
                <InfoBlock {...{ title, description, link: `/dossiers-list/dossier?id=${id}` }} key={id}/>
            ))
        )
    }

    return (
        <div className="dossiers-container">
            <InfoBlockContainer>
                {renderContent()}
            </InfoBlockContainer>
        </div>
    )
}