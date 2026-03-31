import { IBaseSuccessResponse } from "@/Models";
import { Entities } from "@/shared/Store/EntitiesSlice/models";

export interface UserEntitiesResponse extends IBaseSuccessResponse<Entities> {
  data: Entities;
}

export interface UserThumbProps {
  isAuthorized: boolean | undefined;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  position?: string;
  options: Entities;
  onLogout?: () => void;
}
