"use client"
import { UserThumb } from './UserThumb';
import { useEffect, useState } from 'react';
import { fetchGetEntitiesUserEntitiesUserGet } from '@generated/lawyersSiteApiComponents';
import { useInterceptor } from '@/Service/useInterceptor';
import useEntitiesStore, { isEmptyEntities } from '@/Store/useEntitiesStore';
import { skipToken } from '@tanstack/react-query';
import { isSkipToken } from '@/Utils';

export const UserComponent = () => {
    const hasHydrated = useEntitiesStore((state) => state.hasHydrated);
    const entities = useEntitiesStore((state) => state.entities);
    const setEntities = useEntitiesStore((state) => state.setEntities);
    const [isAuthorized, setIsAuthorized] = useState<undefined | boolean>();

    const getUserEntities = async () => {
        const data = await fetchGetEntitiesUserEntitiesUserGet({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return data;
    }
    const getEntitiesRq = hasHydrated ? (isEmptyEntities(entities) ? getUserEntities : skipToken) : skipToken;
    const [response, isLoading] = useInterceptor(getEntitiesRq);
    const isRenderSkeleton = isLoading || !hasHydrated;

    useEffect(() => {
        if (hasHydrated && isSkipToken(getEntitiesRq)) {
            setIsAuthorized(true);
        }
    }, [hasHydrated, getEntitiesRq]);

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

    if (isRenderSkeleton) {
        return <div className='animate-pulse w-[100%] h-[100%] bg-gray-200 rounded' />;
    }

    return <UserThumb options={entities} isAuthorized={isAuthorized} />;
}