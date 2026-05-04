"use client";

import { FC, Fragment, useMemo } from "react";
import { useGetService } from "../api/useGetService";
import { ServiceItem } from "@/entities/serviceItem";
import { ServiceProps } from "../model/types";
import type {
  Company,
  Individual,
} from "@/shared/Store/EntitiesSlice/models";
import { ServicesEntityType } from "@/generated/lawyersSiteApiSchemas";

const getEntityType = (
  chosenEntity: ServiceProps["chosenEntity"],
): ServicesEntityType => {
  if ("ceo_name" in chosenEntity) {
    return "COMPANY";
  }
  if ("birth_date" in chosenEntity) {
    return "INDIVIDUAL";
  }
  return "SOLE_PROPRIETOR";
};

export const ServiceByEntityType: FC<ServiceProps> = ({ chosenEntity }) => {
  const entityType = useMemo(
    () => getEntityType(chosenEntity),
    [chosenEntity],
  );

  const [response, isLoading] = useGetService(entityType);
  const data =
    "data" in response && Array.isArray(response.data) ? response.data : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
      {data.map((item) => (
        <Fragment key={item.id}>
          <ServiceItem
            {...item}
            link={`/service/form?serviceId=${item.id}`}
            linkText="Заказать услугу"
          />
          <ServiceItem
            {...item}
            link={`/service/ordered?serviceId=${item.id}`}
            linkText="Посмотреть заказанные услуги"
          />
        </Fragment>
      ))}
    </div>
  );
};
