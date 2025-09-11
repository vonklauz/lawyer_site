import { IBaseSuccessResponse, IFormSchema, IDossierFormSection, IDosserForm } from "@/Models";
import { baseApi } from "./baseApi";

export const dossierApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFormSchemas: builder.query<IBaseSuccessResponse<IFormSchema[]>, void>({
            query: () => ({
                url: 'forms/schemas',
                method: 'GET',
            })
        }),
        getSchemaById: builder.query<IBaseSuccessResponse<IDossierFormSection>, string>({
            query: (schemaId) => ({
                url: `forms/schemas/${schemaId}`,
                method: 'GET',
            })
        }),
        getPrefilledForm: builder.query<IBaseSuccessResponse<IDosserForm>, string>({
            query: (schemaId) => ({
                url: `forms/${schemaId}`,
                method: 'GET',
            })
        }),
        saveForm: builder.mutation<IBaseSuccessResponse<null>, IDosserForm>({
            query: (form) => ({
                url: `forms`,
                method: 'POST',
                body: form
            })
        }),
        updateForm: builder.mutation<IBaseSuccessResponse<null>, { form: Partial<IDosserForm>, formId: string | undefined }>({
            query: ({ form, formId }) => ({
                url: `forms/${formId}`,
                method: 'PUT',
                body: form
            })
        }),
    })
});

export const {
    useGetFormSchemasQuery,
    useGetSchemaByIdQuery,
    useGetPrefilledFormQuery,
    useSaveFormMutation,
    useUpdateFormMutation,
} = dossierApi;