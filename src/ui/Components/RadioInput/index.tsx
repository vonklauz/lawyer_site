import type { IDossierFormField } from '~/Models';
import styles from './RadioInputStyles.module.css';
import { useRef, type ChangeEvent } from 'react';

interface IRadioProps extends Omit<IDossierFormField, 'type' | 'length' | 'mask' | 'required'> {
    value?: string;
    error?: string;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput = ({ id, title, choices, value, error, disabled, onChange }: IRadioProps) => {
    const radioInputRef = useRef<HTMLInputElement | null>(null);

    const renderOptions = () => (
        choices?.map(({ id: choiceId, label }) => (
            <div className={styles.item} key={choiceId}>
                <input
                    id={choiceId + id}
                    className={styles.input}
                    type="radio"
                    value={choiceId}
                    name={id}
                    checked={value === choiceId?.toString()}
                    ref={radioInputRef}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                />
                <label htmlFor={choiceId + id} className={styles.label}>
                    <span className={styles.text} onClick={() => !disabled && radioInputRef?.current?.click()}>{label}</span>
                </label>
            </div>
        ))
    )

    return (
        <div>
            <label className="form-label">{title}</label>
            <div className={styles.options}>
                {renderOptions()}
            </div>
            {error && <span className="error">{error}</span>}
        </div>
    )
}