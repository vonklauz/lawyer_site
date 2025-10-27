// "use client"
// import { IDocumentsFormState, IUserDocument, IDocumentsSection } from "@/Models";
// import { useGetDocumentsQuery, useGetUserDocumentsQuery } from "@/Service/docsApi";
// import { cloneDeep } from "@/Utils";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";

// /**
//  * Хук получения схемы и пользовательских документов с сервера.
//  */
// export const useLoadUserDocs = (): { userDocs: IDocumentsFormState[] | undefined, isLoading: boolean } => {
//     const [userDocs, setUserDocs] = useState<IDocumentsFormState[]>();
//     const [isLoading, setIsLoading] = useState(false);

//     const { data: docsSchemaData, isLoading: isDocsSchemaLoading } = useGetDocumentsQuery();
//     const { data: userDocsData, isLoading: isUserDocsLoading } = useGetUserDocumentsQuery();

//     useEffect(() => {
//         if (docsSchemaData?.success) {
//             let newFormState = [];
//             const sections = docsSchemaData.data[0];
//             for (let id in sections) {
//                 const section = sections[id]
//                 newFormState.push(section)
//             }
//             if (userDocsData?.success) {
//                 const mappedUserDocs = mapUserDocs(userDocsData?.data[0]);
//                 newFormState = [...concatSchemaAndUserDocs(newFormState, mappedUserDocs)];
//             }
//             setUserDocs(newFormState);
//         }

//     }, [docsSchemaData, userDocsData]);

//     useEffect(() => {
//         if (isDocsSchemaLoading || isUserDocsLoading) {
//             setIsLoading(true);
//         }
//         else {
//             setIsLoading(false);
//         }
//     }, [isDocsSchemaLoading, isUserDocsLoading]);

//     const mapUserDocs = (useDocsContainer: { [key: string]: IUserDocument[] }) => {
//         const result: IUserDocument[] = [];
//         for (let id in useDocsContainer) {
//             useDocsContainer[id].forEach(doc => result.push(doc))
//         }
//         return result;
//     }

//     const concatSchemaAndUserDocs = (newFormState: IDocumentsSection[], userDocs: IUserDocument[]): IDocumentsFormState[] => {
//         const concatResult: IDocumentsFormState[] = cloneDeep(newFormState);
//         concatResult.forEach((section) => {
//             userDocs.forEach((doc) => {
//                 const documentIndex = section.documents.findIndex((docItem) => docItem.document_id === doc.document_id);
//                 const document = section.documents[documentIndex];
//                 if (documentIndex > -1) {
//                     section.documents[documentIndex] = { ...section.documents[documentIndex], userDocs: document.userDocs ? [...document.userDocs, { ...doc }] : [{ ...doc }] };
//                 }
//             })
//         })

//         return concatResult;
//     }

//     return { userDocs, isLoading };
// }