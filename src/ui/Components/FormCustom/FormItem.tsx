import type { JSX } from 'react'
import styles from './Form.module.css'

export interface IFormItemProps {
    title: string;
    subTitle?: string;
    children: JSX.Element | JSX.Element[];
    button?: JSX.Element;
}

export const FormItem = ({ title, children, subTitle, button }: IFormItemProps) => (
    <div className={styles.formItem}>
        <div className={styles.formHeader}>
            <h2 className={`title title_h2 ${styles.formTitle}`}>{title}</h2>
            {subTitle && (
                <small>{subTitle}</small>
            )}
            {button && button}
        </div>
        <div className={styles.formBody}>
            {children}
        </div>
    </div>
)