import styles from './Hero.module.css';

interface IHeroProps {
    title: string;
    breadcrumbs?: Array<{
        text: string;
        link?: string;
    }>;
}

export const Hero = ({ title, breadcrumbs }: IHeroProps) => {

    const renderBreadcrumbs = () => (
        <nav className={styles.breadcrumbs}>
            <ul className={styles.breadcrumbsList}>
                {breadcrumbs?.map((breadcrumb, index) => {
                    if (index === breadcrumbs.length - 1) {
                        return (
                            <li key={breadcrumb.text} className={styles.breadcrumbsItem}>
                                <span className={styles.breadcrumbsCurrent}>{breadcrumb.text}</span>
                            </li>
                        )
                    } else {
                        return (
                            <li key={breadcrumb.text} className={styles.breadcrumbsItem}>
                                <a href={breadcrumb.link} className={styles.breadcrumbsLink}>{breadcrumb.text}</a>
                            </li>
                        )
                    }
                })}
            </ul>
        </nav>
    )

    return (
        <section className={styles.hero}>
            <div className={styles.heroContainer}>
                {renderBreadcrumbs()}
                <h1 className='title title_h1'>{title}</h1>
            </div>
        </section>
    )
}