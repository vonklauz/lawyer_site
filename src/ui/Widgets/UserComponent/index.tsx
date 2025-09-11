"use client"

import styles from './User.module.css'
import { useEffect, useState } from 'react';
import { UserThumb } from './UserThumb';
import { useLogoutMutation } from '@/Service/authApi';
import { useGetUserMutation } from '@/Service/baseApi';
import { getUserFromStore, setUser } from '@/Store/User/userSlice';
import { handleLogoutSuccess } from '@/Utils';
import { useSelector, useDispatch } from 'react-redux';


export const UserComponent = () => {
    const [isRendering, setIsRendering] = useState(true);
    const user = useSelector(getUserFromStore);
    const dispatch = useDispatch();
    const [getUser, resultGetUser] = useGetUserMutation();
    const [logoff, resultLogoff] = useLogoutMutation();
    const { data, isLoading, error } = resultGetUser;

    useEffect(() => {
        setIsRendering(false);
    }, []);

    useEffect(() => {
        if (resultLogoff?.data?.success) {
            handleLogoutSuccess();
        }
    }, [resultLogoff])

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            if (!data?.userId) {
                const localUser: string | null = sessionStorage.getItem('user');
                if (!localUser) {
                    getUser('')
                } else {
                    dispatch(setUser({ ...JSON.parse(localUser) }));
                }
            } else {
                if (!user.userId) {
                    dispatch(setUser(data));
                    sessionStorage.setItem('user', JSON.stringify(data))
                }
            }
        }
    }, [data])

    const renderContent = () => {
        if (user.userId) {
            return (
                <UserThumb
                    {...user}
                    onLogout={() => logoff('')}
                />
            )
        }

        return (
            <div className={styles.action}>
                {(isLoading || isRendering) && (
                    <div className={styles.loader}>
                        <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
                <a href="/login" className={`${styles.button} button button_gray button_link`}>
                    Войти
                </a>
            </div>
        )
    }

    return <div style={{ width: '88px' }}>{renderContent()}</div>;
}