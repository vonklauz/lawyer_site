import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'file' | 'date';
    name?: string;
    id?: string;
    value?: string;
    error?: string;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    children?: ReactNode;
    marginBottom?: string;
}

export const Input = ({
    label,
    type = 'text',
    name,
    id,
    value,
    error,
    className,
    onChange,
    placeholder,
    children,
    defaultValue,
    ...props
}: IInputProps) => {
    return (
        <div className="mb-[12px]">
            <label
                htmlFor={id ? id : name ? name : ''}
                className={styles.label}
            >{label}</label>
            <div className={`${styles.inputWrapper}`}>
                <input
                    defaultValue={defaultValue}
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${styles.input} ${props.disabled ? styles.readOnly : ''} ${className}`}
                    {...props}
                />
                {children}
            </div>
            {error && <span className="error">{error}</span>}
        </div>
    )
};