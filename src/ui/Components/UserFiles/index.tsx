import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { FileInput, type IFileInputProps } from "../Input/FileInput"
import type { IUserDocument } from '~/Models';
import { useCallback } from 'react';

interface IUserFilesProps extends IFileInputProps {
    uploadedFiles?: IUserDocument[],
    onDelete?: (documentId: string) => void;
    attachedDocs?: File[];
}

export const UserFiles = ({ uploadedFiles, onDelete, attachedDocs, ...props }: IUserFilesProps) => {

    const renderDocsList = () => {
        if (uploadedFiles) {
            return uploadedFiles.map((file, index) => (
                <div className='mb-2 flex items-center' key={file.id}>
                    <a target="blank" href={file.s3_url}>Документ {index + 1}</a>
                    <XMarkIcon className="w-8 group-data-open:rotate-180 ml-3" onClick={() => (onDelete && !props.disabled) &&  onDelete(file.id)} style={{ cursor: 'pointer' }} />
                </div>
            ))
        }

        return 'Список пуст'
    }

    const getFileNames = useCallback(() => {
        return attachedDocs?.map((doc, index) => {
            if (index + 1 < attachedDocs.length) {
                return doc.name + ', '
            }
            return doc.name
        })
    }, [attachedDocs])

    return (
        <>
            <Disclosure>
                <DisclosureButton className="group flex items-center gap-2">
                    Загруженные файлы
                    <ChevronDownIcon className="w-5 group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel>{renderDocsList()}</DisclosurePanel>
            </Disclosure>
            <FileInput {...props} fileName={getFileNames()?.join('')} />
        </>
    )
}