import styles from './InfoBlock.module.css';

export const InfoBlockContainer = ({children}: {children: React.ReactNode}) => (
    <div className={styles.dossiersItems}>
        {children}
    </div>
)