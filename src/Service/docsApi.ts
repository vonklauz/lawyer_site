import { IBaseSuccessResponse, IDocumentsSection, IUserDocument } from "@/Models";
import { baseApi } from "./baseApi";

export const docsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDocuments: builder.query<IBaseSuccessResponse<[{ [key: number]: IDocumentsSection }]>, void>({
            query: () => ({
                url: 'documents',
                method: 'GET',
            })
        }),
        getUserDocuments: builder.query<IBaseSuccessResponse<[{ [key: string]: IUserDocument[] }]>, void>({
            query: () => ({
                url: 'documents/client-documents',
                method: 'GET',
            }),
        }),
        uploadDocument: builder.mutation<IBaseSuccessResponse<IUserDocument[]>, { documentId: string, files: FormData, method: 'POST' | 'PUT' }>({
            query: ({ documentId, files, method }) => ({
                url: `documents/client-documents?document_id=${documentId}`,
                method: method,
                body: files
            })
        }),
        deleteUserDocument: builder.mutation<IBaseSuccessResponse<{}>, { documentId: string }>({
            query: ({ documentId }) => ({
                url: `documents/client-documents/${documentId}`,
                method: 'DELETE',
            })
        }),
    })
});

export const {
    useGetDocumentsQuery,
    useGetUserDocumentsQuery,
    useUploadDocumentMutation,
    useDeleteUserDocumentMutation,
} = docsApi;