"use client"
import { useSearchParams } from "next/navigation";
import React, { JSX, useEffect } from "react";
import { useState } from "react";
import { ParamsState, SearchParamsProviderProps } from "./models";
import { DEFAULT_PARAMS_STATE } from "./consts";
import { EEntityTypes } from "@/shared/models";

/**
 * HOC для передачи параметров из URL в компонент
 * @param component - компонент, в который нужно передать параметры
 * @returns JSX
 */
export const SearchParamsProvider = ({ component }: SearchParamsProviderProps) => {
    const searchParams = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [paramsForRender, setParamsForRender] = useState<ParamsState>(DEFAULT_PARAMS_STATE);
    console.log('paramsForRender', paramsForRender)
    useEffect(() => {
        const newParamsForRender = { ...paramsForRender };
        (Object.keys(newParamsForRender) as Array<keyof ParamsState>).forEach(key => {
            const value = searchParams.get(key);
            if (value) {
                if (key === 'entityType') {
                    if (Object.values(EEntityTypes).includes(value as EEntityTypes)) {
                        newParamsForRender[key] = value as EEntityTypes;
                    }
                } else {
                    newParamsForRender[key] = value;
                }
            }
        });

        setParamsForRender(newParamsForRender);
        setLoading(false);
    }, [searchParams]);

    const ComponentToRender = component;

    if (isLoading) {
        return <div className="flex justify-center items-center">Загрузка...</div>
    }

    return <>
        {React.cloneElement(<ComponentToRender />, { ...paramsForRender })}
    </>
}