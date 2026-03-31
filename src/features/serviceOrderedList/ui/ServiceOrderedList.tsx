"use client";

import { useGetServiceInstances } from "@/shared/hooks/useGetServiceInstances";
import { Table } from "@/shared/Ui/Table";
import { format } from "date-fns";
import { FC, useMemo } from "react";

export const ServiceOrderedList: FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { data, isPending: isLoading } = useGetServiceInstances();
  const { data: serviceInstances = [] } = data || {};

  const filterInstancesByServiceId = useMemo(() => {
    const chosenInstanceServices = serviceInstances.find(
      (instance) => instance.service_id === serviceId,
    );

    if (!chosenInstanceServices) {
      return [];
    }

    return chosenInstanceServices?.instances?.map(
      ({ id, current_state, created_at, title }) => ({
        id,
        name: title,
        submissionDate: format(created_at, "dd.MM.yyyy"),
        status: current_state,
        detailsUrl: `/service/details?instanceId=${id}`,
      }),
    );
  }, [serviceInstances, serviceId]);

  console.log(filterInstancesByServiceId);

  return (
    <>
      <div>
        <Table
          title="Статусы дел, находящихся в работе"
          data={filterInstancesByServiceId}
          isLoading={isLoading}
        />
      </div>
      {!filterInstancesByServiceId && (
        <div>
          <p>Созданные услуги по данному типу профиля отсутствуют. </p>
          <a
            href={`/service/form?serviceId=${serviceId}`}
            className="text-blue-500 hover:underline!"
          >
            Создать новую услугу
          </a>
        </div>
      )}
    </>
  );
};
