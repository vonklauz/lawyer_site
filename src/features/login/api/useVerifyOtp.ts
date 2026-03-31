import { useVerifyApiV1TwoFactorTotpVerifyPost } from "@/generated/lawyersSiteApiComponents";

export const useVerifyOtp = () => {
  const {
    mutateAsync: verifyOtp,
    data,
    error,
    isPending,
  } = useVerifyApiV1TwoFactorTotpVerifyPost();
  return { verifyOtp, data, error, isPending };
};
