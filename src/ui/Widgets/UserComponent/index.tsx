"use client"
import useUserStore from '@/Store/useUserStore';
import { UserThumb } from './UserThumb';
import { useEffect, useState } from 'react';
import { fetchGetEntitiesUserEntitiesUserGet } from '@generated/lawyersSiteApiComponents';
import { useInterceptor } from '@/Service/useInterceptor';
import useEntitiesStore from '@/Store/useEntitiesStore';

export const UserComponent = () => {
    const hasHydrated = useUserStore((state) => state.hasHydrated);
    const entities = useEntitiesStore((state) => state.entities);
    const setEntities = useEntitiesStore((state) => state.setEntities);
    console.log('entities', entities);
    const [isAuthorized, setIsAuthorized] = useState<undefined | boolean>();
    // const setUser = useUserStore((state) => state.setUser);
    // const user = useUserStore((state) => state.user);

    const getUserEntities = async () => {
        const data = await fetchGetEntitiesUserEntitiesUserGet({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return data;
    }
    const [response, isLoading] = useInterceptor(getUserEntities);

    useEffect(() => {
        //@ts-expect-error позже типизировать
        if (response?.success) {
            //@ts-expect-error позже типизировать
            setEntities({ ...response?.data });
            setIsAuthorized(true);
        }
        //@ts-expect-error позже типизировать
        if (response?.error) {
            setIsAuthorized(false);
        }
    }, [response]);

    if (isLoading) {
        return <div className='animate-pulse w-[100%] h-[100%] bg-gray-200 rounded' />;
    }
    
    return <UserThumb options={entities} isAuthorized={isAuthorized} />;
}