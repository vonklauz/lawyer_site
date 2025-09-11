import { Fragment, useEffect, useState, type ChangeEvent } from "react";
import type { ValidationError } from "yup";
import { FormItem } from "~/Components/FormCustom/FormItem";
import { FormWrapper } from "~/Components/FormCustom/FormWrapper";
import { Input } from "~/Components/Input";
import { RadioInput } from "~/Components/RadioInput";
import { FormSkeleton } from "~/Components/Skeleton/FormSkeleton";
import type { IDosserForm, ObjectWithProps } from "~/Models";
import { useGetPrefilledFormQuery, useGetSchemaByIdQuery, useSaveFormMutation, useUpdateFormMutation } from "~/Service/dossierApi"
import { mapSchemaFromData } from "~/Utils/validation";

type DossierForm = ObjectWithProps<string>;

export const DossierForm = () => {
    const [form, setForm] = useState<DossierForm>({});
    const [isPrefilledForm, setPrefilledForm] = useState(false);
    const [isFormChanhed, setFormChanged] = useState(false);
    const [errors, setErrors] = useState<ObjectWithProps<string>>({});

    const url = new URL(window.location.href);
    const formId = url.searchParams.get("id") as string;

    const { data: formSchema, isLoading } = useGetSchemaByIdQuery(formId);
    const { data: prefilledForm, isLoading: isPrefilledFormLoading } = useGetPrefilledFormQuery(formId);

    const [saveForm, resultSaveForm] = useSaveFormMutation();
    const [updateForm, resultUpdateForm] = useUpdateFormMutation();

    const isFormSubmiting = resultSaveForm.isLoading || resultUpdateForm.isLoading;
    const isDisabledUI = isFormSubmiting || isPrefilledFormLoading;
    const isAllowedToSubmit = !isDisabledUI && isFormChanhed;

    console.log('prefilledForm', prefilledForm)
    console.log('form', form)
    console.log('errors', errors)

    useEffect(() => {
        if (prefilledForm?.data) {
            setPrefilledForm(true);
            const newForm: ObjectWithProps = {};
            prefilledForm?.data.values.forEach(({ field_id, value }) => {
                newForm[field_id] = value;
            });

            setForm({ ...newForm });
        }
    }, [prefilledForm])

    useEffect(() => {
        const serverErrors = resultSaveForm?.data?.error?.message ?? resultUpdateForm?.data?.error?.message;
        if (serverErrors) {
            const newErrors: ObjectWithProps<string> = {};
            for (const error in serverErrors) {
                newErrors[error] = serverErrors[error];
            }
            setErrors(newErrors);
        }
    }, [resultSaveForm?.data?.error, resultUpdateForm?.data?.error])


    const mapFormForServer = (form: DossierForm) => {
        const mappedForm: IDosserForm = {
            schema_id: formSchema?.data.schema_id ?? '',
            values: []
        }
        for (const key in form) {
            mappedForm.values.push({
                field_id: key,
                value: form[key]
            })
        }
        return mappedForm;
    }

    const validateForm = () => {
        if (!formSchema?.data) {
            return false;
        }

        const fieldsArr = formSchema.data.blocks.map((block) => block.fields);
        const validationSchema = mapSchemaFromData(fieldsArr);

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

        const mappedForm = mapFormForServer({ ...form });

        if (isPrefilledForm) {
            updateForm({ form: { values: mappedForm.values }, formId: prefilledForm?.data.form_id });
        } else {
            saveForm(mappedForm);
        }
        setFormChanged(false);

    }

    if (isLoading) {
        return (
            <div className="dossier-container">
                <FormSkeleton />
            </div>
        )
    }

    const onChange = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const newForm = { ...form };
        newForm[id] = e.target.value;
        setForm(newForm);
        setFormChanged(true);
    }

    if (formSchema?.data) {
        return (
            <div className="dossier-container">
                <FormWrapper action={() => { }}>
                    <FormItem title={formSchema?.data.form_title} key={formSchema?.data.schema_id}>
                        <>
                            {formSchema?.data.blocks.map((block) => (
                                <Fragment key={block.block_title}>
                                    <h4 className="title text-lg mt-4">{block.block_title}</h4>
                                    {block.fields.map(({ id, title, type, ...props }) => {
                                        if (type === 'text') {
                                            return <Input
                                                key={id}
                                                label={title}
                                                onChange={onChange(id)}
                                                value={form[id] ?? ''}
                                                error={errors[id]}
                                                disabled={isDisabledUI}
                                            />
                                        } else if (type === 'select') {
                                            return <RadioInput
                                                {...{ id, title, ...props }}
                                                key={id}
                                                onChange={onChange(id)} value={form[id] ?? ''}
                                                error={errors[id]}
                                                disabled={isDisabledUI}
                                            />
                                        }
                                    })}
                                </Fragment>
                            ))}
                            <button
                                className="button button_green w-full lg:w-50"
                                type="button"
                                onClick={(e) => {
                                    if (isAllowedToSubmit) {
                                        validateForm()
                                    }
                                }}
                                disabled={isDisabledUI}>
                                {!isDisabledUI ? 'Отправить' : 'Отправка...'}
                            </button>
                        </>
                    </FormItem>
                </FormWrapper>
            </div>
        )
    }
}