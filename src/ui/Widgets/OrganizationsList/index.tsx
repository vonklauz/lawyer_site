"use client";
import useEntitiesStore, { Entities } from "@/Store/useEntitiesStore";
import useUserStore from "@/Store/useUserStore";
import { Gap } from "@/ui/Components/Gap";
import { Table, TableItem } from "@/ui/Components/Table";
import Link from "next/link";
import { Fragment } from "react";

const tableStructure = {
    name: {
        label: 'Наименование'
    },
    info: {
        label: 'Информация'
    },
}

export const OrganizationsList = () => {
    const hasHydrated = useEntitiesStore((state) => state.hasHydrated);
    const entities = useEntitiesStore((state) => state.entities);
    console.log('entities', entities)

    const getTitle = (entityName: keyof Entities) => {
        const linkToCreateNewEntityTypeItem = `/profile/requisites/form?entityType=${entityName}`
        let entityTypeTitle;
        if (entityName === 'company') {
            entityTypeTitle = 'Юридические лица';
        } else if (entityName === 'sole_proprietor') {
            entityTypeTitle = 'Индивидуальные предприниматели';
        } else {
            entityTypeTitle = 'Физические лица';
        }

        return <div className="flex justify-between items-center"><div>{entityTypeTitle}</div><Link className="ml-3 text-xs underline!" href={linkToCreateNewEntityTypeItem}>Добавить</Link></div>
    }
    const getOptions = (entities: Entities, entityName: keyof Entities) => {
        const mappedOptions: TableItem[] = [];
        const entitiesArr = entities[entityName];
        //@ts-expect-error позже типизировать
        entitiesArr.forEach(({ entity_id, name, last_name, first_name, middle_name, }) => {
            mappedOptions.push({
                id: entity_id,
                name: entityName === 'company' ? name : entityName === 'sole_proprietor' ? `ИП ${last_name} ${first_name} ${middle_name}` : `${last_name} ${first_name} ${middle_name}`,
                detailsUrl: `/profile/requisites/form?entityType=${entityName}&entityId=${entity_id}`
            })
        })

        return mappedOptions;
    }

    return (
        <>
            {hasHydrated && Object.keys(entities).map((entityName) => {
                return (
                    <Fragment key={entityName}>
                        <Table title={getTitle(entityName as keyof Entities)} structure={tableStructure} data={getOptions(entities, entityName as keyof Entities)} colorScheme={entityName === 'company' ? 'red' : 'blue'} />
                        <Gap size={20} />
                    </Fragment>
                )
            })}
        </>
    )
};