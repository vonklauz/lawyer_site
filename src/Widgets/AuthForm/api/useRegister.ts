import { useRegisterUserApiV1AuthRegistrationPost } from "@generated/lawyersSiteApiComponents";

export const useRegister = () => {
    const { mutate, data, error, isPending } = useRegisterUserApiV1AuthRegistrationPost();
    return { mutate, data, error, isPending };
};