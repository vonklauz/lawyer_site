"use client";

import { FC, Fragment, useMemo } from "react";
import { useGetService } from "../api/useGetService";
import { ServiceItem } from "@/entities/serviceItem";
import { ServiceProps } from "../model/types";
import { useSuspenseGetApiV1ServiceInstancesGet } from "@/generated/lawyersSiteApiComponents";

export const ServiceByEntityType: FC<ServiceProps> = ({ chosenEntity }) => {
  const getChosenEntityType = useMemo(() => {
    if (!chosenEntity) {
      return;
    }
    //@ts-expect-error позже типизировать
    return chosenEntity.ceo_name
      ? "COMPANY"
      : //@ts-expect-error позже типизировать
        chosenEntity.birth_date
        ? "INDIVIDUAL"
        : "SOLE_PROPRIETOR";
  }, [chosenEntity]);

  const type = getChosenEntityType;
  const [response, isLoading] = useGetService(type) || {};
  //@ts-expect-error позже типизировать
  const { data, error } = response;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
      {data?.map(
        //@ts-expect-error позже типизировать
        (item) => (
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
        ),
      )}
    </div>
  );
};
