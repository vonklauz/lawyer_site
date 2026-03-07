/**
 * Типы для UserComponent
 * Следуют правилам Feature-Sliced Design (FSD)
 */

import { Entities, EntityItem } from "@/shared/Store/EntitiesSlice/useEntitiesStore";
import { IBaseSuccessResponse } from "@/Models";

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
