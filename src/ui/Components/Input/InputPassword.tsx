import { useState } from "react";
import { Input, type IInputProps } from ".";
import styles from './Input.module.css';

export const InputPassword = (props: IInputProps) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const renderEyeIcon = () => (
        <button className={`${styles.inputButton} ${styles.lightIconButton}`} onClick={() => setPasswordVisible(!isPasswordVisible)} type="button">
            {!isPasswordVisible && <i className={styles.iconEye}></i>}
            {isPasswordVisible && <i className={styles.iconCrossedEye}></i>}
        </button>
    )

    return (
        <Input {...props} type={isPasswordVisible ? 'text' : 'password'}>
            {renderEyeIcon()}
        </Input>
    )
}