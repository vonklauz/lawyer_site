"use client"
import { JSX, useState } from 'react';
import styles from './Table.module.css';
import Link from 'next/link';
import { TableItem, TableProps } from '.';

export const TableSingle = ({ title, colorScheme = 'blue', structure, data }: TableProps) => {
    const [filter, setFilter] = useState<'all' | 'new'>('all');

    const filteredData = filter === 'all'
        ? data
        : data?.filter(item => item.status === 'new');

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
                            {/**@ts-expect-error позже типизировать */}
                            {Object.entries(structure).map(([key, { label }]) => (
                                <th key={key}>{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map(({ id, name, submissionDate, status, detailsUrl }) => {
                            const is2ColTable = !submissionDate && !status;
                            return (
                                <tr key={id}>
                                    <td className={`${is2ColTable ? 'w-[70%]' : ''}`}>{name}</td>
                                    {submissionDate && <td>{submissionDate}</td>}
                                    {status && <td>{renderStatus(status)}</td>}
                                    <td className={`${is2ColTable ? 'w-[30%]' : ''}`}>
                                        <Link href={detailsUrl || '#'}>Посмотреть</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
