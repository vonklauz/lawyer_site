import styles from './Button.module.css';

interface IButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type?: "button" | "submit" | "reset" | undefined,
    color?: string
    className?: string
    disabled?: boolean
}

export const Button = ({ children, onClick, type, color = 'blue', className, disabled }: IButtonProps) => (
    <button
        type={type || 'button'}
        onClick={onClick && onClick}
        className={`flex justify-center items-center ${styles.button} ${styles[color]} ${className}`}
        disabled={disabled}
    >{children}</button>
)