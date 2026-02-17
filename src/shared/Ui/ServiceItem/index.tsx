import { Gap } from "../Gap";
import styles from "./ServiceItem.module.css";

interface ServiceItemProps {
    title: string;
    description: string;
    linkText: string;
    isChosenMethod?: boolean;
    link?: string;
    onClick?: () => void;
}

export const ServiceItem = ({ title, description, isChosenMethod, linkText, link, onClick }: ServiceItemProps) => {
    return (
        <div className={`${styles.serviceItem} flex items-start space-x-4 p-4`}>
            <div className="flex flex-col justify-between h-full w-full">
                <div>
                    <h3 className="text-xl text-center">{title}</h3>
                    <Gap size={20} />
                    <p className="font-light text-center">{description}</p>
                    {isChosenMethod && <p className="green-font text-xs text-center">Подключенный метод</p>}
                </div>
                <div className="text-center w-full">
                    <Gap size={20} />
                    <a href={link || '#'} onClick={onClick && onClick} className={isChosenMethod ? "red-font" : "blue-font"}>{isChosenMethod ? "Отключить" : linkText}</a>
                </div>
            </div>
        </div>
    );
};
