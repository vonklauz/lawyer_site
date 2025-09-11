"use client"
import { IScheduleEventState, IUserScheduleEvent, IScheduleEvent } from "@/Models";
import { useGetScheduleQuery, useGetUserScheduleQuery } from "@/Service/schedule.api";
import { cloneDeep } from "@/Utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";


/**
 * Хук получения схемы и пользовательских событий календаря с сервера.
 */
export const useLoadSchedule = (): { schedule: IScheduleEventState[] | undefined, isLoading: boolean } => {
    const [schedule, setSchedule] = useState<IScheduleEventState[]>();
    const [isLoading, setIsLoading] = useState(false);
    const { data: eventsData, isLoading: isGetScheduleSchemaLoading } = useGetScheduleQuery();
    const { data: userEventsData, isLoading: isUserEventsLoading } = useGetUserScheduleQuery();

    useEffect(() => {
        if (eventsData?.success) {
            let newSchedule = [...eventsData.data.events];
            if (userEventsData?.success) {
                const mappedUserEvents = mapUserEvents(userEventsData.data.eventTasks);
                newSchedule = [...concatScheduleAndUserEvents(newSchedule, mappedUserEvents)];
            }
            setSchedule([...newSchedule]);
        }

    }, [eventsData, userEventsData]);

    useEffect(() => {
        if (isGetScheduleSchemaLoading || isUserEventsLoading) {
            setIsLoading(true);
        }
        else {
            setIsLoading(false);
        }

    }, [isGetScheduleSchemaLoading, isUserEventsLoading]);

    const mapUserEvents = (userEvents: IUserScheduleEvent[]) => {
        const result: IScheduleEventState[] = [];
        userEvents.forEach((event) => result.push({ id: event.event.id, title: event.event.title, userEventId: event.id, sendDate: event.send_date }));
        return result;
    }

    const concatScheduleAndUserEvents = (schedule: IScheduleEvent[], userEvents: IScheduleEventState[]) => {
        const concatResult: IScheduleEventState[] = cloneDeep(schedule);

        concatResult.forEach((event) => {
            const userEvent = userEvents.find((ue) => ue.id === event.id);
            if (userEvent) {
                event.userEventId = userEvent.userEventId;
                event.sendDate = userEvent.sendDate ? format(new Date(userEvent.sendDate), 'dd.MM.yyyy') : '';
            }
        })

        return concatResult;
    }

    return { schedule, isLoading };
}