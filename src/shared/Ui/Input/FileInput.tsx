import { useRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.css';

export interface IFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name?: string;
    id?: string;
    value?: string;
    multiple?: boolean;
    error?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
    fileName?: string | undefined;
}

export const FileInput = ({
    label,
    name,
    id,
    value,
    multiple = false,
    error,
    onChange,
    children,
    fileName,
    ...props
}: IFileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={styles.formRow}>
            <label
                htmlFor={id ? id : name ? name : ''}
                className={styles.formLabel}
            >{label}</label>
            <div className={`${styles.inputWrapper} ${props.disabled ? styles.readOnly : ''}`}>
                <input
                    type="file"
                    multiple={multiple}
                    name={name}
                    id={id}
                    value={value}
                    onChange={(e) => onChange && onChange(e)}
                    className="hidden"
                    ref={fileInputRef}
                    {...props}
                />
                <span className={`${styles.input} ${styles.inputLikeSpan}`} title={fileName} onClick={() => fileInputRef?.current?.click()}>{fileName ? fileName : `Выберите ${multiple ? 'до 10 файлов' : 'файл'}`}</span>
                {children}
            </div>
            {error && <span className="error">{error}</span>}
        </div>
    )
};