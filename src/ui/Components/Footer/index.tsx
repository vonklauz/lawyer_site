import { useMemo } from 'react';
import styles from './Footer.module.css'
import { MENU_LINKS } from '@/Consts';

export const Footer = () => {

    const getLinks = useMemo(() => {
        return MENU_LINKS;
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <a href="/" className={`${styles.footerLogo} ${styles.logo}`}>
                    <img src="/logo.svg" alt="Logo" />
                    Сервис самостоятельного банкротства
                </a>
                <div className={styles.footerInfo}>
                    <ul className={styles.footerInfoMenu}>
                        {getLinks.map((item) => (
                            <li key={item.path}>
                                <a href={item.path}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.footerInfoCopy}>
                        <a className={`${styles.footerInfoText} text text_small`} href="">Политика конфиденциальности</a>
                        <div className={`${styles.footerInfoText}  text text_small`}>© 2025 Богатов Групп</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}