import {
  Company,
  Individual,
  SoleProprietor,
} from "@/shared/Store/EntitiesSlice/models";

export type ServiceProps = {
  chosenEntity: Individual | SoleProprietor | Company;
};
