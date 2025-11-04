"use client"
import { ObjectWithProps } from "@/Models";
import { useInterceptor } from "@/Service/useInterceptor";
import useEntitiesStore from "@/Store/useEntitiesStore";
import { Button } from "@/ui/Components/Button";
import { FormWrapper } from "@/ui/Components/FormCustom/FormWrapper";
import { Input } from "@/ui/Components/Input";
import { FormSkeleton } from "@/ui/Components/Skeleton/FormSkeleton";
import { mapSchemaFromData } from "@/Utils/validation";
import {
    fetchGetSchemaEntitiesCompaniesSchemaGet,
    fetchGetSchemaEntitiesIndividualsSchemaGet,
    fetchGetSchemaEntitiesSoleProprietorSchemaGet,
    useCreateEntityEntitiesCompaniesPost,
    useCreateEntityEntitiesIndividualsPost,
    useCreateEntityEntitiesSoleProprietorPost,
    useGetEntitiesUserEntitiesCompaniesEntityIdPut,
    useGetEntitiesUserEntitiesIndividualsEntityIdPut,
    useGetEntitiesUserEntitiesSoleProprietorEntityIdPut
} from "@generated/lawyersSiteApiComponents";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { ValidationError } from "yup";
import { RequisitesModal } from "../RequisitesModal";

interface RequisitesFormProps {
    entityType: "individual" | "sole_proprietor" | "company";
    entityId?: string
}

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
        getSchemaRq: fetchGetSchemaEntitiesCompaniesSchemaGet,
        submit: useCreateEntityEntitiesCompaniesPost,
        update: useGetEntitiesUserEntitiesCompaniesEntityIdPut,
    }
}

export const RequisitesForm = ({ entityType, entityId }: RequisitesFormProps) => {
    const [form, setForm] = useState({});
    const [formSchema, setFormSchema] = useState([]);
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
    const requestDataResponse = requestData.data || updateData.data as any;


    const getSchema = async () => {
        const data = await REQUISITES_FORM_CONFIG[entityType].getSchemaRq({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return data;
    }

    const [schemaResponse, isSchemaLoading] = useInterceptor(getSchema);
    const isLoading = isCreatingEntity || isUpdatingEntoty || isSchemaLoading as boolean;

    // console.log('formSchema', formSchema)
    // console.log('form', form)

    useEffect(() => {
        {/**@ts-expect-error позже типизировать */ }
        if (!schemaResponse?.data) {
            return;
        }
        {/**@ts-expect-error позже типизировать */ }
        const newSchema = []
        {/**@ts-expect-error позже типизировать */ }
        schemaResponse?.data?.blocks?.forEach((block) => newSchema.push(...block.fields));
        {/**@ts-expect-error позже типизировать */ }
        setFormSchema(newSchema)
    }, [schemaResponse])

    useEffect(() => {
        console.log(requestDataResponse)
        if (requestDataResponse?.success) {
            setIsConfirmModalOpen(false);
            const newEntities = { ...entities };
            if (entityId) {
                const index = newEntities[entityType].findIndex((item) => item.entity_id === entityId);
                {/**@ts-expect-error позже типизировать */ }
                newEntities[entityType][index] = { ...form };
            } else {
                newEntities[entityType].push({ ...requestDataResponse?.data });
            }
            setEntities({...newEntities})
        }
    }, [requestDataResponse])

    useEffect(() => {
        if (hasHydrated && entityId) {
            const prefilledForm = entities[entityType].find((item) => item.entity_id === entityId);
            setForm({ ...prefilledForm });
        }
    }, [hasHydrated, entityType, entityId]);


    //@ts-expect-error типизировать позже
    const validateAndSend = (requestData) => {
        {/**@ts-expect-error позже типизировать */ }
        const validationSchema = mapSchemaFromData(schemaResponse?.data?.blocks?.map((block) => block.fields));
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

    const onChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const newForm = { ...form };
        {/**@ts-expect-error позже типизировать */ }
        newForm[name] = e.target.value;
        setForm(newForm);
        setFormChanged(true);
    }

    const submitRequest = () => {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            pathParams: {},
            body: form,
        }
        if (entityId) {
            params.pathParams = { entityId }
            {/**@ts-expect-error позже типизировать */ }
            updateEntityRq({ ...params });
        } else {
            {/**@ts-expect-error позже типизировать */ }
            createEntityRq({ ...params })
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