"use client"
import { SearchBar } from './SearchBar';
import styles from './Header.module.css';
import { useScreenSize } from '@/Hooks/useScreenSize';
import { Link } from '@/Models';
import { UserComponent } from '@/ui/Widgets/UserComponent';
import { useState, useEffect } from 'react';
import LogoImage from '../public/Logo.svg';


interface IHeaderProps {
    links: Link[]
}

export const HeaderComponent = (props: IHeaderProps) => {
    // const user = useSelector((state: RootState) => state.userSlice.user);
    const { width } = useScreenSize();
    const [isDesktop, setDesktop] = useState(false);
    const [isDevice, setDevice] = useState(false);
    const [isOpenDeviceMenu, setOpenDeviceMenu] = useState(false);

    // useEffect(() => {
    //     if (width > 991) {
    //         setDesktop(true);
    //         setDevice(false);
    //     } else if (width <= 991) {
    //         setDesktop(false);
    //         setDevice(true);
    //     }
    // }, [width]);

    return (
        <header>
            <div className={styles.headerTop}>
                <div className="container">
                    <div className="flex mx-[-15px] divide-x-1 divide-gray-300">
                        <div className={`w-33 flex items-center flex-1 ${styles.headerItem}`}>
                            <img className={styles.logo} src="/Logo.svg" alt="Богатов Групп" />
                        </div>
                        <div className={`w-33 flex items-end justify-end flex-1 ${styles.headerItem}`}>
                            <div className='flex items-center justify-center gap-3'>
                                <div className={`${styles.headerTopIcon} relative cursor-pointer`}>
                                    <img src="/icons/idea.svg" alt="" />
                                </div>
                                <div className={`${styles.headerTopIcon} relative cursor-pointer`}>
                                    <img src="/icons/letter.svg" alt="" />
                                    <span className='absolute -top-1 -left-1 w-3 h-3 rounded-full bg-red-600 text-white text-[8px] font-bold flex items-center justify-center'>10</span>
                                </div>
                                <div className={`${styles.headerTopIcon} relative cursor-pointer`}>
                                    <img src="/icons/settings.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={`w-33 flex flex-1 ${styles.headerItemLast}`}>
                            <div className="w-full max-w-[400px]">
                                <UserComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.headerBottom}>
                <div className="container flex">
                    <div className={styles.headerLink}>
                        <a href="/">Главная</a>
                    </div>
                    <div className={styles.headerLink}>
                        <a href="/organizations">Мои организации</a>
                    </div>
                    <div className={styles.headerLink}>
                        <a href="/trials">Суды</a>
                    </div>
                    <div className={styles.headerLink}>
                        <a href="/fines">Штрафы</a>
                    </div>
                    <div className={styles.headerLink}>
                        <a href="/service">Услуги</a>
                    </div>
                </div>
            </div>
        </header>
    )
}