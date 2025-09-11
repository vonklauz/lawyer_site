import { format } from "date-fns";
import { Datepicker } from "~/Components/Datepicker";
import styles from './CalendarForm.module.css';
import type { IScheduleEventState } from "~/Models";
import { useEffect, useState } from "react";
import { CalendarFormSkeleton } from "~/Components/Skeleton/CalendarFormSkeleton";
import { useLoadSchedule } from "~/Hooks/useLoadSchedule";
import { cloneDeep, getDateFromString } from "~/Utils";
import inputStyles from '~/Components/Input/Input.module.css';

import { useCreateUserEventMutation, useDeleteUserEventMutation, useUpdateUserEventMutation } from "~/Service/schedule.api";


export const CalendarForm = () => {
    const [form, setForm] = useState<IScheduleEventState[]>([]);
    const [createEvent, resultCreateEvent] = useCreateUserEventMutation();
    const [updateEvent, resultUpdateEvent] = useUpdateUserEventMutation();
    const [deleteEvent, resultDeleteEvent] = useDeleteUserEventMutation();
    const { schedule, isLoading } = useLoadSchedule();
    console.log('form', form)

    useEffect(() => {
        if (schedule) {
            setForm(schedule);
        }
    }, [schedule]);

    useEffect(() => {
        if(resultCreateEvent?.data?.success) {
            updateEventDate({id: resultCreateEvent.data.data.event.id, userEventId: resultCreateEvent.data.data.id})
        }
    }, [resultCreateEvent])

    const updateEventDate = ({ id, date, disabled, userEventId }: { id: string, date?: Date | null, disabled?: boolean, userEventId?: string }) => {
        const newForm = cloneDeep(form) as IScheduleEventState[];
        const eventToUpdate = newForm.find((event) => event.id === id);
        if (eventToUpdate) {
            if (date) {
                eventToUpdate.sendDate = format(new Date(date), 'dd.MM.yyyy');
            } else if (date === null) {
                eventToUpdate.sendDate = undefined;
            }
            if (disabled !== undefined) {
                eventToUpdate.disabled = disabled;
            }
            if (userEventId) {
                eventToUpdate.userEventId = userEventId;
            }
            setForm([...newForm]);
        }
    }

    const sendEventToServer = (id: string) => {
        const eventToSend = form.find((event) => event.id === id);
        if (eventToSend && eventToSend.sendDate) {
            if (!eventToSend.userEventId) {
                const dataForSend = { id: eventToSend.id, sendDate: getDateFromString(eventToSend.sendDate) };
                createEvent(dataForSend);
            } else {
                const dataForSend = { id: eventToSend.userEventId, sendDate: getDateFromString(eventToSend.sendDate) };
                updateEvent(dataForSend)
            }
            updateEventDate({ id, disabled: true });
        }
    }

    const deleteEventFromServer = (id: string) => {
        const eventToDelete = form.find((event) => event.id === id);
        if (eventToDelete) {
            deleteEvent({ userEventId: eventToDelete.userEventId })
            updateEventDate({ id, date: null, disabled: true });
        }
    }

    return <div className={`${styles.scheduleMain} "schedule-container"`}>
        <div className={styles.form}>
            {isLoading && <CalendarFormSkeleton />}
            {form?.map((event) => (
                <div key={event.id}>
                    {/**@ts-ignore */}
                    <Datepicker label={event.title} id={event.id} value={event.sendDate} onChange={updateEventDate} disabled={event.disabled}>
                        <div className={`${inputStyles.inputButton} ${inputStyles.lightIconButton} icon_pencil`} onClick={() => updateEventDate({ id: event.id, disabled: !event.disabled })} />
                    </Datepicker>
                    {!event.disabled && (
                        <div className="flex mt-2 mb-4">
                            <button className="button button_small button_green mr-4" type="button" onClick={() => sendEventToServer(event.id)}>Сохранить</button>
                            {event.sendDate && <button className="button button_small button_red" type="button" disabled={!event.userEventId} onClick={() => deleteEventFromServer(event.id)}>Удалить</button>}
                        </div>
                    )}

                </div>
            ))}
        </div>
    </div>
}