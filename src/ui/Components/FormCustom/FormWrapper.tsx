import type { FormAction } from '@/Models';
import styles from './Form.module.css';

interface FormWrapperProps {
    action: FormAction;
    children: React.ReactNode;
    className?: string;
}

export const FormWrapper = (props: FormWrapperProps) => {
    return (
        <div className={props.className}>
            <form className={styles.form} action={props.action}>
                {props.children}
            </form>
        </div>
    )
}