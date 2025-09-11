import { IBaseSuccessResponse, IEvents, IScheduleEvent, IUserEvents, IUserScheduleEvent, ISimpleResponse, IScheduleEventState } from "@/Models";
import { baseApi } from "./baseApi";

export const scheduleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSchedule: builder.query<IBaseSuccessResponse<IEvents>, void>({
            query: () => ({
                url: 'schedule/events',
                method: 'GET',
            }),
            transformResponse: (response: IBaseSuccessResponse<IEvents>): IBaseSuccessResponse<IEvents> => ({
                ...response,
                data: {
                    events: response.data.events.map((event: IScheduleEvent) => ({ ...event, disabled: true }))
                }
            })
        }),
        getUserSchedule: builder.query<IBaseSuccessResponse<IUserEvents>, void>({
            query: () => ({
                url: 'schedule/events-tasks',
                method: 'GET',
            }),
            transformResponse: (response: IBaseSuccessResponse<{ event_tasks: IUserScheduleEvent[] }>): IBaseSuccessResponse<IUserEvents> => ({
                ...response,
                data: {
                    eventTasks: response.data.event_tasks
                }
            })
        }),
        createUserEvent: builder.mutation<IBaseSuccessResponse<IUserScheduleEvent>, Partial<IUserScheduleEvent>>({
            query: (event) => ({
                url: 'schedule/events-tasks/',
                method: 'POST',
                body: {
                    event_id: event.id,
                    send_date: event.sendDate
                }
            })
        }),
        updateUserEvent: builder.mutation<ISimpleResponse, Partial<IScheduleEventState>>({
            query: ({ sendDate, id }) => ({
                url: `schedule/events-tasks/${id}`,
                method: 'PUT',
                body: {
                    send_date: sendDate
                }
            })
        }),
        deleteUserEvent: builder.mutation<ISimpleResponse, Partial<IScheduleEventState>>({
            query: ({ userEventId }) => ({
                url: `schedule/events-tasks/${userEventId}`,
                method: 'DELETE',
            })
        }),
    })
});

export const {
    useGetScheduleQuery,
    useGetUserScheduleQuery,
    useCreateUserEventMutation,
    useUpdateUserEventMutation,
    useDeleteUserEventMutation
} = scheduleApi;