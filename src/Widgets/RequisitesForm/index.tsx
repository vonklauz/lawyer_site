"use client"
import { ObjectWithProps } from "@/Models";
import { useInterceptor } from "@/shared/hooks/useInterceptor";
import useEntitiesStore from "@/Store/useEntitiesStore";
import { Button } from "@/shared/Ui/Button";
import { FormWrapper } from "@/shared/Ui/FormCustom/FormWrapper";
import { Input } from "@/shared/Ui/Input";
import { FormSkeleton } from "@/shared/Ui/Skeleton/FormSkeleton";
import { mapSchemaFromData } from "@/Utils/validation";
import {
    fetchGetSchemaCompanyEntityApiV1CompaniesSchemaGet,
    fetchGetSchemaEntitiesIndividualsSchemaGet,
    fetchGetSchemaEntitiesSoleProprietorSchemaGet,
    useCreateEntityEntitiesCompaniesPost,
    useCreateEntityEntitiesIndividualsPost,
    useCreateEntityEntitiesSoleProprietorPost,
    useGetEntitiesUserEntitiesCompaniesEntityIdPut,
    useGetEntitiesUserEntitiesIndividualsEntityIdPut,
    useGetEntitiesUserEntitiesSoleProprietorEntityIdPut
} from "@generated/lawyersSiteApiComponents";
import { ChangeEvent, FC, useActionState, useEffect, useState } from "react";
import { ValidationError } from "yup";
import { RequisitesModal } from "../RequisitesModal";
import { RequisitesFormProps } from "./models";
import { SchemaField, SchemaResponse, EntityFormData, RequestParams, EntityResponse } from "./lib/types";



const REQUISITES_FORM_CONFIG = {
    individual: {
        title: "Реквизиты физического лица",
        getSchemaRq: fetchGetSchemaEntitiesIndividualsSchemaGet,
        submit: useCreateEntityEntitiesIndividualsPost,
        update: useGetEntitiesUserEntitiesIndividualsEntityIdPut,
    },
    sole_proprietor: {
        title: "Реквизиты ИП",
        getSchemaRq: fetchGetSchemaEntitiesSoleProprietorSchemaGet,
        submit: useCreateEntityEntitiesSoleProprietorPost,
        update: useGetEntitiesUserEntitiesSoleProprietorEntityIdPut,
    },
    company: {
        title: "Реквизиты организации",
        getSchemaRq: fetchGetSchemaCompanyEntityApiV1CompaniesSchemaGet,
        submit: useCreateEntityEntitiesCompaniesPost,
        update: useGetEntitiesUserEntitiesCompaniesEntityIdPut,
    }
}

export const RequisitesForm: FC<RequisitesFormProps> = ({ entityType, entityId }) => {
    const [form, setForm] = useState<EntityFormData>({});
    const [formSchema, setFormSchema] = useState<SchemaField[]>([]);
    const [isFormChanged, setFormChanged] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [errors, setErrors] = useState<ObjectWithProps<string> | null>(null);
    const entities = useEntitiesStore((state) => state.entities);
    const setEntities = useEntitiesStore((state) => state.setEntities);
    const hasHydrated = useEntitiesStore((state) => state.hasHydrated);
    const requestData = REQUISITES_FORM_CONFIG[entityType].submit();
    const updateData = REQUISITES_FORM_CONFIG[entityType].update();
    const {
        mutate: createEntityRq,
        isPending: isCreatingEntity,
    } = requestData;
    const {
        mutate: updateEntityRq,
        isPending: isUpdatingEntoty,
    } = updateData;
    const requestDataResponse = (requestData.data || updateData.data) as EntityResponse | undefined;


    const getSchema = async (): Promise<SchemaResponse> => {
        const data = await REQUISITES_FORM_CONFIG[entityType].getSchemaRq({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return data as any;
    }

    const [schemaResponse, isSchemaLoading] = useInterceptor<SchemaResponse>(getSchema);
    const isLoading = isCreatingEntity || isUpdatingEntoty || isSchemaLoading as boolean;

    // console.log('formSchema', formSchema)
    // console.log('form', form)

    useEffect(() => {
        const response = schemaResponse as SchemaResponse | undefined;
        if (!response?.data) {
            return;
        }
        const newSchema: SchemaField[] = []
        response?.data?.blocks?.forEach((block) => newSchema.push(...block.fields));
        setFormSchema(newSchema)
    }, [schemaResponse])

    useEffect(() => {
        console.log(requestDataResponse)
        if (requestDataResponse?.success) {
            setIsConfirmModalOpen(false);
            const newEntities = { ...entities };
            if (entityId) {
                const index = newEntities[entityType].findIndex((item) => item.entity_id === entityId);
                newEntities[entityType][index] = { ...form } as any;
            } else {
                if (requestDataResponse?.data) {
                    newEntities[entityType].push({ ...requestDataResponse?.data } as any);
                }
            }
            setEntities({...newEntities})
        }
    }, [requestDataResponse])

    useEffect(() => {
        if (hasHydrated && entityId) {
            const prefilledForm = entities[entityType].find((item) => item.entity_id === entityId);
            if (prefilledForm) {
                setForm({ ...prefilledForm } as EntityFormData);
            }
        }
    }, [hasHydrated, entityType, entityId]);


    const validateAndSend = (requestData: EntityFormData): void => {
        const response = schemaResponse as SchemaResponse | undefined;
        const blocks = response?.data?.blocks ?? [];
        const fields = blocks.flatMap((block) => block.fields);
        const validationSchema = mapSchemaFromData(fields.length > 0 ? [fields] : [[] as any]);
        try {
            validationSchema.validateSync(form, { abortEarly: false })
        } catch (err) {
            const validationErrors = err as ValidationError;
            const newErrors: ObjectWithProps<string> = {};
            validationErrors.inner.forEach((e) => {
                newErrors[e.path as string] = e.message;
            });
            setErrors(newErrors);
            return;
        }
        setIsConfirmModalOpen(true)
        // try {
        //     REQUISITES_FORM_CONFIG[entityType].validationSchema.validateSync({ ...requestData }, { abortEarly: false })
        // } catch (err) {
        //     const validationErrors = err as ValidationError;
        //     const newErrors: ObjectWithProps = {};
        //     validationErrors.inner.forEach((e) => {
        //         newErrors[e.path as string] = e.message;
        //     });
        //     setErrors(newErrors);
        //     return;
        // }
        // setErrors(null);

        // rqIp({
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //     },
        //     pathParams: {
        //         entityId: '019a02ec-827c-7963-bef8-1ee8de967698'
        //     },
        //     body: requestData
        // })
        // request({
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        //     },
        //     body: requestData
        // })
    }
    async function handleFormAction(prevState: unknown, formData: FormData) {
        if (isLoading || isPending) return;
        const requestData = {};
        validateAndSend(requestData);

        return requestData
    }

    const onChange = (name: string) => (e: ChangeEvent<HTMLInputElement>): void => {
        const newForm = { ...form };
        newForm[name] = e.target.value;
        setForm(newForm);
        setFormChanged(true);
    }

    const submitRequest = (): void => {
        const params: RequestParams = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
            },
            pathParams: {},
            body: form,
        }
        if (entityId) {
            params.pathParams = { entityId }
            updateEntityRq({ ...params } as any);
        } else {
            createEntityRq({ ...params } as any)
        }
    }

    const [actionState, action, isPending] = useActionState(handleFormAction, {});

    if (isLoading) {
        return (
            <FormSkeleton />
        )
    }

    return <div>
        <FormWrapper action={action}>
            {formSchema?.map(({ name, title, type, max_length}) => {
                const isDateField = type === 'date';
                return (
                    <div className={`${isDateField ? "w-[30%]" : "w-[100%]"}`} key={name}>
                        <Input
                            type={isDateField ? 'date' : 'text'}
                            key={name}
                            label={title}
                            onChange={onChange(name)}
                            value={form[name] ?? ''}
                            error={errors?.[name]}
                            disabled={isLoading}
                            maxLength={max_length}
                        />
                    </div>
                )

            })}
            <Button type="submit" disabled={isLoading} className={`mt-[16px]`}><p>Сохранить</p></Button>
        </FormWrapper>
        <RequisitesModal schema={formSchema} details={form} isOpen={isConfirmModalOpen} onConfirm={submitRequest} onEdit={() => setIsConfirmModalOpen(false)} />
    </div>;
}