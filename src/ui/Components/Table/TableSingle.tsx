"use client"
import { useState } from 'react';
import styles from './Table.module.css';
import Link from 'next/link';

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
    data: TableItem[];
}

export const TableSingle = ({ title, colorScheme = 'blue', data }: TableProps) => {
    const [filter, setFilter] = useState<'all' | 'new'>('all');

    const filteredData = filter === 'all'
        ? data
        : data.filter(item => item.status === 'new');

    const renderStatus = (status: TableItem['status']) => {
        switch (status) {
            case 'new':
                return 'Новый';
            case 'in_progress':
                return 'В обработке';
            case 'completed':
                return 'Завершен';
            default:
                return status;
        }
    };

    return (
        <div className='overflow-x-scroll md:overflow-x-auto'>
            <div className={styles['table-container']}>
                <div className={styles['table-filter']}>
                    <h4 className={`${styles['table-title']} ${colorScheme}-bg`}>{title}</h4>
                    <span>Показывать: </span>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'all' | 'new')}
                    >
                        <option value="all">Все</option>
                        <option value="new">Новые</option>
                    </select>
                </div>

                <table className={styles['data-table']}>
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Дата подачи</th>
                            <th>Статус</th>
                            <th>Информация</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.submissionDate}</td>
                                <td>{renderStatus(item.status)}</td>
                                <td>
                                    <Link href={item.detailsUrl}>Посмотреть</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
