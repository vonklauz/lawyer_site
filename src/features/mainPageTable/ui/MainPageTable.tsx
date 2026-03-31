"use client";

import { useGetServiceInstances } from "@/shared/hooks/useGetServiceInstances";
import { isLastIndex } from "@/shared/lib";
import { Gap } from "@/shared/Ui/Gap";
import { Table } from "@/shared/Ui/Table";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";

export const MainPageTable = () => {
  const { data, isPending: isLoading } = useGetServiceInstances();
  const { data: serviceInstances = [] } = data || {};

  const mappedServiceInstances = useMemo(() => {
    return serviceInstances.map(({ service_id, service_title, instances }) => {
      return {
        service_id,
        service_title,
        instances: instances?.map(
          ({ id, current_state, created_at, title }) => ({
            id,
            name: title,
            submissionDate: format(created_at, "dd.MM.yyyy"),
            status: current_state,
            detailsUrl: `/service/details?instanceId=${id}`,
          }),
        ),
      };
    });
  }, [serviceInstances]);
  console.log(mappedServiceInstances);

  return (
    <div>
      {mappedServiceInstances?.map(
        ({ instances, service_title, service_id }, index) => {
          const colorScheme =
            service_title === "Услуга для юрика" ||
            (mappedServiceInstances.length === 2 &&
              isLastIndex(index, mappedServiceInstances))
              ? "red"
              : "blue";
          return (
            <Fragment key={service_id}>
              <Table
                title={service_title}
                data={instances}
                isLoading={isLoading}
                colorScheme={colorScheme}
              />
              {!isLastIndex(index, mappedServiceInstances) && <Gap size={20} />}
            </Fragment>
          );
        },
      )}
    </div>
  );
};
