"use client"
import { SearchBar } from './SearchBar';
import styles from './Header.module.css';
import { useScreenSize } from '@/Hooks/useScreenSize';
import { Link } from '@/Models';
import { RootState } from '@/Store';
import { UserComponent } from '@/ui/Widgets/UserComponent';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


interface IHeaderProps {
    links: Link[]
}

export const HeaderComponent = (props: IHeaderProps) => {
    const user = useSelector((state: RootState) => state.userSlice.user);
    const { width } = useScreenSize();
    const [isDesktop, setDesktop] = useState(false);
    const [isDevice, setDevice] = useState(false);
    const [isOpenDeviceMenu, setOpenDeviceMenu] = useState(false);

    useEffect(() => {
        if (width > 991) {
            setDesktop(true);
            setDevice(false);
        } else if (width <= 991) {
            setDesktop(false);
            setDevice(true);
        }
    }, [width]);

    return (
        <header className={`${styles.header} ${isOpenDeviceMenu ? styles.menuOpen : ''}`}>
            <div className={styles.headerContainer}>
                <button
                    type="button"
                    className={`${styles.menuIcon} ${styles.iconMenu}`}
                    onClick={() => setOpenDeviceMenu(!isOpenDeviceMenu)}>
                    <span></span>
                </button>
                <a href="/" className={styles.headerLogo}><img src="/logo.svg" alt="Logo" /></a>
                <div className={styles.menuBlock}>
                    <div className={styles.headerMenu}>
                        <nav className={styles.menuBody}>
                            <ul className={styles.menuList}>
                                {props.links.map((item) => (
                                    <li className={styles.menuItem} key={item.path}>
                                        <a href={item.path} className={styles.menuLink}>{item.label}</a>
                                    </li>
                                ))}
                                {isDevice && user.userId && (
                                    <li className={styles.menuItem} key="searchBar"><SearchBar /></li>
                                )}
                            </ul>
                        </nav>
                    </div>
                    {isDesktop && user.userId && <SearchBar />}
                    <UserComponent />
                </div>
            </div>
        </header>
    )
}