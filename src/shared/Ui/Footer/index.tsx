import styles from './Footer.module.css'

export const Footer = () => {

    return (
        <footer>
            <div className={styles.footer}>
                <div className="container">
                    <div className="row flex flex-col md:flex-row items-center justify-between md:divide-x-1 py-6">
                        <div className={`w-full md:w-33 flex-1 md:text-center ${styles.footerItem}`}><a href="#">Пожелания по доработке кабинета</a></div>
                        <div className={`w-full md:w-33 flex-1 md:text-center ${styles.footerItem}`}><a href="#">База Знаний Богатов-Групп</a></div>
                        <div className={`w-full md:w-33 flex-1 md:text-center ${styles.footerItem}`}><a href="#">Условия использования личного кабинета</a></div>
                    </div>
                </div>
            </div>
            <div className="container font-light text-center text-sm">
                © 2025. Личный кабинет клиента Богатов Групп. Все права защищены.
            </div>
        </footer>
    )
}