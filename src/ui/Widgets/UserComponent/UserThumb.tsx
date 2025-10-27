"use client";
import { Select } from '@/ui/Components/Select';
import styles from './User.module.css'
import { TSelectOption } from '@/Models';
import { useRouter } from 'next/navigation';
import useEntitiesStore from '@/Store/useEntitiesStore';

interface IUserThumbProps {
    isAuthorized: boolean | undefined;
    firstName?: string;
    secondName?: string;
    lastName?: string;
    position?: string;
    options: {};
    onLogout?: () => void;
}



export const UserThumb = ({ isAuthorized, options }: IUserThumbProps) => {
    // const navigate = () => { };
    const router = useRouter();
    const chosenEntity = useEntitiesStore((state) => state.chosenEntity);
    const chooseEntity = useEntitiesStore((state) => state.chooseEntity);
    const getOptions = () => {
        const mappedOptions: TSelectOption<string>[] = [];
        if (Object.keys(options).length) {
            for (const key in options) {
                //@ts-expect-error типизировать позже
                options[key].forEach((entity) => {
                    const { entity_id, name, first_name, last_name, middle_name } = entity;
                    mappedOptions.push({
                        label: key === 'company' ? name : key === 'sole_proprietor' ? `ИП ${last_name} ${first_name} ${middle_name}` : `${last_name} ${first_name} ${middle_name}`,
                        value: `/profile/requisites/form?entityType=${key}&entityId=${entity_id}`,
                    })
                })

            }
        }

        return mappedOptions;
    }

    const getChosenEntityName = () => {
        if (!chosenEntity) {
            return 'Создайте или выберите тип профиля'
        }

        else {
            return chosenEntity.name || `${chosenEntity.registration_num ? 'ИП ' : ''}${chosenEntity.last_name} ${chosenEntity.first_name} ${chosenEntity.middle_name}`
        }
    }

    const getBottomLink = () => {
        let href = isAuthorized ? "/profile" : "/auth/login";
        let text = isAuthorized ? "Личный кабинет" : "Регистрация / вход";
        return (
            <a href={href}>
                <p className={styles.name}>{text}</p>
            </a>
        )
    }

    return (
        <div className={`${styles.profile} ${isAuthorized ? 'justify-between' : 'justify-center'}`}>
            {isAuthorized && <div className="flex items-center mb-[10px]">
                <div className='mr-[10px] w-[25px] flex-shrink-0'>
                    <img src="/icons/truck.svg" alt="" />
                </div>
                <Select className='w-full' placeholder={getChosenEntityName()} options={getOptions()} onChange={function (value: string): void {

                    router.push(value)
                }} />
            </div>}
            <div className="flex items-center">
                <div className='mr-[10px]  w-[25px]'>
                    <img src="/icons/person.svg" alt="" />
                </div>
                <div>
                    {getBottomLink()}
                </div>
            </div>
        </div>
    )
}