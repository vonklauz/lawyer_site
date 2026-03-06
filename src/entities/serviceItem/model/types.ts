export interface ServiceItemProps {
    title: string;
    description: string;
    linkText: string;
    isChosenMethod?: boolean;
    link?: string;
    onClick?: () => void;
}