import styles from './User.module.css'

interface IUserThumbProps {
    firstName: string;
    secondName?: string;
    lastName: string;
    onLogout: () => void;
}

export const UserThumb = ({ firstName, secondName, lastName, onLogout }: IUserThumbProps) => {
    const navigate = () => {};
    return (
        <div className={styles.userHeader} onClick={() => navigate('/profile')}>
            <div className={styles.icon}>{firstName.slice(0, 1)} {lastName.slice(0, 1)}</div>
            <div className={`${styles.arrow} ${styles.iconDropdown} icon_`}></div>
            <div className={styles.submenuUser}>
                <div className={`${styles.submenuTitle} title title_h4`}>{`${firstName}${secondName ? ` ${secondName} ` : ' '}${lastName}`}</div>
                <ul className={styles.listUser}>
                    <li className={styles.listItem}>
                        <a href="#" className={styles.link}>Личные данные</a>
                    </li>
                    <li className={styles.listItem}>
                        <a href="#" onClick={() => onLogout()} className={`${styles.link} ${styles.iconLogout} link-action icon_`}>Выйти</a>
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}