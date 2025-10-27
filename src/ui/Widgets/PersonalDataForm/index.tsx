// import { User } from "@/Models";
// // import { RootState } from "@/Store";
// // import { getDefaultUser } from "@/Store/User/userSlice";
// import { PhoneInput } from "@/ui/Components/Input/PhoneInput";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styles from './PersonalDataForm.module.css';
// import { Input } from "@/ui/Components/Input";

// export const PersonalDataForm = () => {
//     const [localUser, setLocalUser] = useState<User>(getDefaultUser());
//     const user = useSelector((state: RootState) => state.userSlice.user);
//     console.log(user)

//     useEffect(() => {
//         if (user.userId) {
//             setLocalUser({ ...user })
//         }

//     }, [user]);

//     const renderMainForm = () => {
//         const inputConfig: Array<{
//             label: string;
//             name: keyof User;
//         }> = [{ label: "Фамилия*", name: "lastName" },
//         { label: "Имя*", name: "firstName" },
//         { label: "Отчество*", name: "secondName" },
//         { label: "Телефон*", name: "phone" },
//         { label: "Почта*", name: "email" }];

//         return (
//             <form className={styles.form}>
//                 {inputConfig.map((item) => {
//                     if (item.name === 'phone') {
//                         return (
//                             <PhoneInput key={item.label} {...item} value={localUser[item.name]} disabled />
//                         )
//                     }
//                     return (
//                         <Input key={item.label} {...item} value={localUser[item.name]} disabled />
//                     )
//                 })}
//                 <Input label="Персональный ID" name='userId' value={localUser.userId} disabled />
//             </form>
//         )
//     }

//     return (
//         <div className="personal-container">
//             <div className={`${styles.personalText} text text_descr`}>Вы можете менять свои личные данные, пароли, управлять своим аккаунтом</div>
//             {renderMainForm()}
//         </div>
//     )

// }