import styles from './Button.module.css';

interface IButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type?: "button" | "submit" | "reset" | undefined,
    color?: string
    classname?: string
    disabled?: boolean
}

export const Button = ({ children, onClick, type, color = 'blue', classname, disabled }: IButtonProps) => (
    <button
        type={type || 'button'}
        onClick={onClick && onClick}
        className={`flex justify-center items-center ${styles.button} ${styles[color]} ${classname}`}
        disabled={disabled}
    >{children}</button>
)