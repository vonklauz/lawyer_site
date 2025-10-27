"use client"

import { ObjectWithProps } from "@/Models";
import { Button } from "@/ui/Components/Button";
import { FormWrapper } from "@/ui/Components/FormCustom/FormWrapper";
import { Input } from "@/ui/Components/Input";
import {
    useCreateEntityEntitiesCompaniesPost,
    useCreateEntityEntitiesIndividualsPost,
    useCreateEntityEntitiesSoleProprietorPost,
    useGetEntitiesUserEntitiesCompaniesEntityIdPut,
    useGetEntitiesUserEntitiesIndividualsEntityIdPut,
    useGetEntitiesUserEntitiesSoleProprietorEntityIdPut
} from "@generated/lawyersSiteApiComponents";
import { format } from "date-fns";
import { useActionState, useState } from "react";

interface RequisitesFormProps {
    entityType: "individual" | "sole_proprietor" | "company";
}

const REQUISITES_FORM_CONFIG = {
    individual: {
        title: "Реквизиты физического лица",
        fields: [
            { label: "Имя", name: "first_name" },
            { label: "Фамилия", name: "last_name" },
            { label: "Отчество", name: "middle_name" },
            { label: "Дата рождения", name: "birth_date" },
            { label: "Кем выдан", name: "issued_by" },
            { label: "Дата выдачи", name: "issued_date" },
            { label: "Место рождения", name: "place_of_birth" },
            { label: "Адрес регистрации", name: "registration_address" },
            { label: "Номер паспорта", name: "passport_number" },
            { label: "Серия паспорта", name: "passport_serial" },
            { label: "Код подразделения", name: "code_department" },
        ],
        submit: useCreateEntityEntitiesIndividualsPost
    },
    sole_proprietor: {
        title: "Реквизиты ИП",
        fields: [
            { label: "Фамилия", name: "last_name" },
            { label: "Имя", name: "first_name" },
            { label: "Отчество", name: "middle_name" },
            { label: "ИНН", name: "inn" },
            { label: "Регистрационный номер", name: "registration_num" },
            { label: "Дата регистрации", name: "registration_date" },
            { label: "Юридический адрес", name: "legal_address" },
            { label: "Номер расчётного счёта", name: "account_number" },
            { label: "Название банка", name: "bank_name" },
            { label: "БИК", name: "bik" },
            { label: "Корреспондентский счёт", name: "corr_account" },
        ],
        submit: useCreateEntityEntitiesSoleProprietorPost
    },
    company: {
        title: "Реквизиты организации",
        fields: [
            { label: "Наименование", name: "name" },
            { label: "Регистрационный номер", name: "registration_num" },
            { label: "ИНН", name: "inn" },
            { label: "КПП", name: "kpp" },
            { label: "Юридический адрес", name: "legal_address" },
            { label: "ФИО руководителя", name: "ceo_name" },
            { label: "Номер расчётного счёта", name: "account_number" },
            { label: "Название банка", name: "bank_name" },
            { label: "БИК", name: "bik" },
            { label: "Корреспондентский счёт", name: "corr_account" },
        ],
        submit: useCreateEntityEntitiesCompaniesPost
    }
}

export const RequisitesForm = ({ entityType }: RequisitesFormProps) => {
    const [errors, setErrors] = useState<ObjectWithProps<string> | null>(null);
    const requestData = REQUISITES_FORM_CONFIG[entityType].submit();
    const {
        mutate: request,
        isPending: isLoading,
    } = requestData;
    const { mutate: rq } = useGetEntitiesUserEntitiesCompaniesEntityIdPut()
    const { mutate: rqPhysical } = useGetEntitiesUserEntitiesIndividualsEntityIdPut()
    const { mutate: rqIp } = useGetEntitiesUserEntitiesSoleProprietorEntityIdPut()
    console.log('data', requestData)
    const requestDataResponse = requestData.data as any;
    //@ts-expect-error типизировать позже
    const validateAndSend = (requestData) => {
        console.log(requestData)
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

        rqIp({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            pathParams: {
                entityId: '019a02ec-827c-7963-bef8-1ee8de967698'
            },
            body: requestData
        })
        // request({
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        //     },
        //     body: requestData
        // })
    }
    async function handleFormAction(prevState: unknown, formData: FormData) {
        if (isLoading || isPending) return;
        console.log(formData)
        const requestData = {};

        REQUISITES_FORM_CONFIG[entityType].fields.forEach(({ name }) => {
            if (name.includes('date')) {
                //@ts-expect-error типизировать позже
                const [day, month, year] = formData.get(name).split(".");
                const date = new Date(+year, +month - 1, +day);
                // console.log(formData.get(name))
                //@ts-expect-error типизировать позже
                requestData[name] = format(date, 'yyyy-MM-dd');
            } else {
                //@ts-expect-error
                requestData[name] = formData.get(name);
            }
            // if (fieldName === 'phone') {
            //     //@ts-expect-error
            //     requestData[fieldName] = clearPhoneNumberString(formData.get(fieldName));
            // } else {
            //     //@ts-expect-error
            //     requestData[fieldName] = formData.get(fieldName);
            // }



        });
        validateAndSend(requestData);

        return requestData
    }
    const [actionState, action, isPending] = useActionState(handleFormAction, {});
    return <div>
        <FormWrapper
            action={action}
        // className={formStyles.authForm}
        >
            {REQUISITES_FORM_CONFIG[entityType].fields.map((field) => (
                //@ts-expect-error типизировать позже
                <Input key={`${field.name}`} label={field.label} type="text" name={field.name} id={`${field.name}Input`} defaultValue={actionState?.[field.name]} disabled={isLoading} error={errors?.[field.name]} />
            ))}
            <Button type="submit" disabled={isLoading} className={`mt-[16px]`}><p>Сохранить</p></Button>
        </FormWrapper>
    </div>;
}