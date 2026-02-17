import { EEntityTypes } from "@/shared/models";
import { FC } from "react";

export interface SearchParamsProviderProps {
    component: FC<any>;
}
export interface ParamsState {
    entityType: EEntityTypes | null;
    entityId?: string | null;
}

