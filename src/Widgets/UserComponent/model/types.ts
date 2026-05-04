import { IBaseSuccessResponse } from "@/shared/models/types";
import { Entities } from "@/shared/Store/EntitiesSlice/models";
import { GetAllEntitiesApiV1EntitiesGetVariables } from "@/generated/lawyersSiteApiComponents";

export interface UserEntitiesResponse extends IBaseSuccessResponse<Entities> {
  data: Entities;
}

export type GetAllEntitiesVariables = GetAllEntitiesApiV1EntitiesGetVariables;

export interface UserThumbProps {
  isAuthorized: boolean | undefined;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  position?: string;
  options: Entities;
  onLogout?: () => void;
}
