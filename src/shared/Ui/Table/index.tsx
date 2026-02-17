"use client"
import { JSX, useState } from 'react';
import styles from './Table.module.css';
import Link from 'next/link';
import { TableWrapper } from './TableWrapper';
import { TableSingle } from './TableSingle';

const tableStructure = {
    name: {
        label: 'Наименование'
    },
    sendDate: {
        label: 'Дата подачи'
    },
    status: {
        label: 'Статус'
    },
    info: {
        label: 'Информация'
    },
}

const testData: TableItem[] = [
    {
        id: 1,
        name: "Заявление на регистрацию ООО",
        submissionDate: "2023-07-01",
        status: "new",
        detailsUrl: "/applications/1"
    },
    {
        id: 2,
        name: "Оформление договора аренды",
        submissionDate: "2023-06-28",
        status: "in_progress",
        detailsUrl: "/applications/2"
    },
    {
        id: 3,
        name: "Консультация по налогообложению",
        submissionDate: "2023-06-25",
        status: "completed",
        detailsUrl: "/applications/3"
    },
    {
        id: 4,
        name: "Подготовка искового заявления",
        submissionDate: "2023-07-02",
        status: "new",
        detailsUrl: "/applications/4"
    }
];

export interface TableItem {
    id: number | string;
    name: string;
    submissionDate?: string;
    status?: 'new' | 'in_progress' | 'completed';
    detailsUrl?: string;
}

export interface TableProps {
    title: JSX.Element | string;
    colorScheme?: 'blue' | 'red';
    structure?: Record<string, { label: string }>;
    data?: TableItem[];
}

export const Table = ({ title, colorScheme = 'blue', structure = tableStructure, data = testData }: TableProps) => (
    <TableWrapper>
        <TableSingle title={title} colorScheme={colorScheme} structure={structure} data={data} />
    </TableWrapper>
)