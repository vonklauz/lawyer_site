import type { FormAction } from '~/Models';
import styles from './Form.module.css';

interface FormWrapperProps {
    action: FormAction;
    children: React.ReactNode;
}

export const FormWrapper = (props: FormWrapperProps) => {
    return (
        <div className={styles.bankruptcyForm}>
            <form className={styles.form} action={props.action}>
                {props.children}
            </form>
        </div>
    )
}