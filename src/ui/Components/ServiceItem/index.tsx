import { Gap } from "../Gap";
import styles from "./ServiceItem.module.css";

interface ServiceItemProps {
    title: string;
    description: string;
    linkText: string;
    link?: string;
    onClick?: () => void;
}

export const ServiceItem = ({ title, description, linkText, link, onClick }: ServiceItemProps) => {
    return (
        <div className={`${styles.serviceItem} flex items-start space-x-4 p-4`}>
            <div className="flex flex-col justify-between h-full w-full">
                <div>
                    <h3 className="text-xl text-center">{title}</h3>
                    <Gap size={20} />
                    <p className="font-light text-center">{description}</p>
                </div>
                <div className="text-center w-full">
                    <Gap size={20} />
                    <a href={link || '#'} onClick={onClick && onClick} className="blue-font">{linkText}</a>
                </div>
            </div>
        </div>
    );
};
