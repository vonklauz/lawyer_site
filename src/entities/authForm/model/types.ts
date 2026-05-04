import { ObjectWithProps, RegisterData } from "@/shared/models/types";

export interface IAuthFormProps {
    title: string;
    fields: string[];
    bottomLinks: { href: string; text: string; linkText?: string }[];
    handleFormAction: (prevState: unknown, formData: FormData) => Promise<RegisterData | undefined>;
    isLoginMode: boolean;
    isRegistrationMode: boolean;
    errors?: ObjectWithProps<string> | null;
}