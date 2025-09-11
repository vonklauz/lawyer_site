import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "~/Components/Input";
import type { User } from "~/Models";
import type { RootState } from "~/Store";
import styles from './PersonalDataForm.module.css'
import { PhoneInput } from "~/Components/Input/PhoneInput";
import { getDefaultUser } from "~/Store/User/userSlice";

export const PersonalDataForm = () => {
    const [localUser, setLocalUser] = useState<User>(getDefaultUser());
    const user = useSelector((state: RootState) => state.userSlice.user);
    console.log(user)

    useEffect(() => {
        if (user.userId) {
            setLocalUser({ ...user })
        }

    }, [user]);

    const renderMainForm = () => {
        const inputConfig: Array<{
            label: string;
            name: keyof User;
        }> = [{ label: "Фамилия*", name: "lastName" },
        { label: "Имя*", name: "firstName" },
        { label: "Отчество*", name: "secondName" },
        { label: "Телефон*", name: "phone" },
        { label: "Почта*", name: "email" }];

        return (
            <form className={styles.form}>
                {inputConfig.map((item) => {
                    if (item.name === 'phone') {
                        return (
                            <PhoneInput key={item.label} {...item} value={localUser[item.name]} disabled />
                        )
                    }
                    return (
                        <Input key={item.label} {...item} value={localUser[item.name]} disabled />
                    )
                })}
                <Input label="Персональный ID" name='userId' value={localUser.userId} disabled />
            </form>
        )
    }

    return (
        <div className="personal-container">
            <div className={`${styles.personalText} text text_descr`}>Вы можете менять свои личные данные, пароли, управлять своим аккаунтом</div>
            {renderMainForm()}
        </div>
    )

}