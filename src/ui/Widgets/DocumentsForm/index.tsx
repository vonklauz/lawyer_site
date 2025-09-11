import { Fragment, useEffect, useState, type ChangeEvent } from "react";
import { FormItem } from "~/Components/FormCustom/FormItem";
import { FormWrapper } from "~/Components/FormCustom/FormWrapper";
import { FormSkeleton } from "~/Components/Skeleton/FormSkeleton";
import { UserFiles } from "~/Components/UserFiles";
import { ALLOWED_FILE_TYPES, ALLOWED_FILE_TYPES_TEXT } from "~/Consts";
import { useLoadUserDocs } from "~/Hooks/useLoadUserDocs";
import type { IDocumentsFormState } from "~/Models";
import { useDeleteUserDocumentMutation, useUploadDocumentMutation } from "~/Service/docsApi"
import { isEmpty } from "~/Utils";

export const DocumentsForm = () => {
    const [form, setForm] = useState<IDocumentsFormState[]>([]);
    const { userDocs, isLoading } = useLoadUserDocs();
    const [uploadDocument, resultUploadDocument] = useUploadDocumentMutation();
    const [deleteDoument, resultDeleteDocument] = useDeleteUserDocumentMutation();

    const { isLoading: isDocumentUploading, data: uploadDocData } = resultUploadDocument;
    const { isLoading: isDocumentDeleting } = resultDeleteDocument;
    const isLoadingDocs = isLoading || isDocumentDeleting || isDocumentUploading;

    console.log('form', form)

    useEffect(() => {
        if (userDocs) {
            setForm(userDocs)
        }
    }, [userDocs]);

    /**
     * Задаём таймаут для отображения ошибки в случаях, когда клиентское действие не обязательно для её снятия.
     */
    const setTemproraryError = (newForm: IDocumentsFormState[], sectionIndex: number, docIndex: number) => {
        setForm([...newForm])
        setTimeout(() => {
            newForm[sectionIndex].documents[docIndex].error = '';
            setForm([...newForm])
        }, 5000);
    }

    useEffect(() => {
        if (uploadDocData?.success) {
            const response = uploadDocData.data;
            const newForm = [...form];
            newForm.some((sectionItem) => {
                //За один раз можем загрузить документы только из одного инпута, поэтому id берём из первого же элемента массива
                const docsIndex = sectionItem.documents.findIndex((documentItem) => documentItem.document_id === response[0].document_id)
                if (docsIndex > -1) {
                    if (sectionItem.documents[docsIndex].userDocs) {
                        sectionItem.documents[docsIndex].userDocs.push(...response)
                    } else {
                        sectionItem.documents[docsIndex].userDocs = [...response];
                    }
                }
            })
            setForm([...newForm]);
        }
    }, [resultUploadDocument]);

    const handleAttachFile = (sectionIndex: number, docIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            console.log(selectedFiles)
            if (selectedFiles.length && selectedFiles.length < 11) {
                const newForm = [...form];
                const prohibitedFiles = [...selectedFiles.filter((file) => !ALLOWED_FILE_TYPES.includes(file.type))];
                newForm[sectionIndex].documents[docIndex].attachedDocs = [...selectedFiles.filter((file) => ALLOWED_FILE_TYPES.includes(file.type))];
                if (prohibitedFiles.length) {
                    const erorrMessage = `
                        Файл(ы) ${prohibitedFiles.map((file) => file.name).join(', ')} не добавлен(ы). 
                        Поддерживаются файлы с расширением ${ALLOWED_FILE_TYPES_TEXT} и не более 10 файлов за раз.
                    `
                    newForm[sectionIndex].documents[docIndex].error = erorrMessage;
                    setTemproraryError(newForm, sectionIndex, docIndex);
                    e.target.value = '';
                    return;
                }
                setForm([...newForm]);
            }
            e.target.value = '';
        }
    }

    const handleUnattachFile = (sectionIndex: number, docIndex: number) => {
        const newForm = [...form];
        delete newForm[sectionIndex].documents[docIndex].attachedDocs;
        setForm([...newForm]);
    }

    const uploadFile = (sectionIndex: number, docIndex: number) => {
        const { document_id, attachedDocs } = form[sectionIndex].documents[docIndex];
        const formData = new FormData();
        if (attachedDocs) {
            attachedDocs.forEach((file) => formData.append('files', file));
            const method = form[sectionIndex].documents[docIndex].userDocs ? 'PUT' : 'POST';
            uploadDocument({ documentId: document_id, files: formData, method });
            handleUnattachFile(sectionIndex, docIndex);
        }
    }

    const deleteUserDocument = (sectionIndex: number, docIndex: number) => (documentId: string) => {
        deleteDoument({ documentId });
        const newForm = [...form];
        const { userDocs } = newForm[sectionIndex].documents[docIndex];
        const newUserDocs = userDocs?.filter((doc) => doc.id !== documentId) || [];
        if (isEmpty(newUserDocs)) {
            delete newForm[sectionIndex].documents[docIndex].userDocs;
        } else {
            newForm[sectionIndex].documents[docIndex].userDocs = [...newUserDocs]
        }

        setForm([...newForm]);
    }

    if (isLoading) {
        return (
            <div className="docs-container">
                <FormSkeleton />
            </div>
        )
    }

    return (
        <div className="docs-container">
            <FormWrapper action={() => { }}>
                <p className="mb-4 text note">Разрешенные типы файлов: {ALLOWED_FILE_TYPES_TEXT}</p>
                {form?.map((sectionItem, sectionIndex) => (<FormItem title={sectionItem.title} key={sectionItem.title}>
                    {sectionItem.documents.map(({ title, document_id, userDocs, attachedDocs, error }, docIndex) => (
                        <Fragment key={document_id}>
                            <UserFiles
                                label={title}
                                name={document_id}
                                onChange={handleAttachFile(sectionIndex, docIndex)}
                                onDelete={deleteUserDocument(sectionIndex, docIndex)}
                                uploadedFiles={userDocs}
                                disabled={isLoadingDocs}
                                attachedDocs={attachedDocs}
                                multiple={true}
                                error={error}
                            />
                            {attachedDocs && attachedDocs.length ? (
                                <div className="flex mt-1 mb-4">
                                    <button className="button button_small button_green mr-4" type="button" disabled={isLoadingDocs} onClick={() => uploadFile(sectionIndex, docIndex)}>Отправить</button>
                                    <button className="button button_small button_red" type="button" disabled={isLoadingDocs} onClick={() => handleUnattachFile(sectionIndex, docIndex)}>Очистить</button>
                                </div>
                            ) : ''}
                        </Fragment>
                    ))}
                </FormItem>))}
            </FormWrapper>
        </div>
    )
}