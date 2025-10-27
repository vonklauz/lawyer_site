"use client"
import { useState } from 'react';
import styles from './Table.module.css';
import Link from 'next/link';
import { TableWrapper } from './TableWrapper';
import { TableSingle } from './TableSingle';

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

interface TableItem {
    id: number;
    name: string;
    submissionDate: string;
    status: 'new' | 'in_progress' | 'completed';
    detailsUrl: string;
}

interface TableProps {
    title: string;
    colorScheme?: 'blue' | 'red';
    data?: TableItem[];
}

export const Table = ({ title, colorScheme = 'blue', data = testData }: TableProps) => (
    <TableWrapper>
        <TableSingle title={title} colorScheme={colorScheme} data={data} />
    </TableWrapper>
)