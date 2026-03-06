import { ObjectWithProps, RegisterData } from "@/Models";

export interface IAuthFormProps {
    title: string;
    fields: string[];
    bottomLinks: { href: string; text: string; linkText?: string }[];
    handleFormAction: (prevState: unknown, formData: FormData) => Promise<RegisterData | undefined>;
    isLoginMode: boolean;
    isRegistrationMode: boolean;
    errors?: ObjectWithProps<string> | null;
}