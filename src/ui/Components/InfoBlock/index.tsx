import styles from './InfoBlock.module.css';

interface IInfoBlockProps {
    title?: string;
    description?: string;
    link?: string;
}

export const InfoBlock = ({ title,
    description,
    link, }: IInfoBlockProps) => (
    <div className={styles.item}>
        <div className={styles.itemTop}>
            <div className={styles.itemIcon}>
                <img src="/icons/dossier-icon.svg" alt="Логотип анкеты" />
            </div>
            <h4 className="title title_h4">{title}</h4>
        </div>
        <div className={styles.itemText}>
            {description}
        </div>
        <a href={link} className={`${styles.itemLink} link-action icon_arrow`}>
            Заполнить
        </a>
    </div>
)