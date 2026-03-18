"use client";
import { ServiceItem } from "@/entities/serviceItem";
import { useGetApiV1ServiceInstancesGet } from "@/generated/lawyersSiteApiComponents";
import { FC } from "react";

export const ServiceOrderedList: FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { data, isLoading, error } = useGetApiV1ServiceInstancesGet({
    headers: {
      //@ts-expect-error позже типизировать
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    queryParams: {
      service_id: serviceId,
    },
  });
  const { data: serviceInstances = [] } = data || {};
  console.log(serviceInstances);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10">
        {serviceInstances?.map(({ id }) => (
          <ServiceItem
            key={id}
            title="Услуга"
            description="Заказанная услуга"
            link={`/service/form?serviceId=${id}`}
            linkText="Посмотреть детали"
          />
        ))}
      </div>
    </>
  );
};
