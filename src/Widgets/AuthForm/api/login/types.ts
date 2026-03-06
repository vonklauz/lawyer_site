export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    pending_token: string;
    two_fa_required?: boolean,
}