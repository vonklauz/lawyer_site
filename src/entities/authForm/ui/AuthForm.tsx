"use client"
import formStyles from "@/shared/Ui/FormCustom/Form.module.css";
import { Input } from "@/shared/Ui/Input";
import { InputPassword } from "@/shared/Ui/Input/InputPassword";
import { getDefaultUser, } from "@/Utils";
import { FormWrapper } from "@/shared/Ui/FormCustom/FormWrapper";
import { Button } from "@/shared/Ui/Button";
import { IAuthFormProps } from "../model/types";
import { useActionState } from "react";

export const AuthForm = (
    {
        title,
        fields,
        bottomLinks,
        handleFormAction,
        isLoginMode,
        isRegistrationMode,
        errors }: IAuthFormProps
) => {
    const [actionState, action, isPending] = useActionState(handleFormAction, { ...getDefaultUser(), password: '' });

    const renderBottomLinkSection = () => {
        return (
            <>
                {bottomLinks.map((item) => (
                    <div className="flex justify-center mt-[8px]" key={item.href}>
                        <a href={item.href} className="font-normal">
                            {item.text}
                            {item.linkText && <span> {item.linkText}</span>}
                        </a>
                    </div>
                ))}
            </>
        )
    }

    return (
        <FormWrapper
            action={action}
            className={formStyles.authForm}
        >
            <>
                <Input label="E-mail" type="email" name="email" id="emailInput" defaultValue={actionState?.email} disabled={isPending} error={errors?.email} />
                <InputPassword label="Пароль" type="password" name="password" id="passwordInput" defaultValue={actionState?.password} disabled={isPending} error={errors?.password} />
                {isLoginMode && <div className="flex justify-center mt-[4px]">
                    <a href="/auth/restore" className="underline">Забыли пароль?</a>
                </div>}
                <Button type="submit" disabled={isPending} className={`right-arrow ${isLoginMode ? 'mt-[16px]' : 'mt-[4px]'}`}><p>{isRegistrationMode ? 'Регистрация' : 'Войти в кабинет'}</p></Button>
                {errors?.general && <div className="error text-center mt-[8px]">{errors.general}</div>}
                {renderBottomLinkSection()}
            </>
        </FormWrapper>
    )
}