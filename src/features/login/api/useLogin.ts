import { useLoginUserApiV1AuthLoginPost } from "@generated/lawyersSiteApiComponents";

export const useLogin = () => {
    const { mutate, data, error, isPending } = useLoginUserApiV1AuthLoginPost();
    return { mutate, data, error, isPending };
}