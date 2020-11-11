export type LoginPostData = { account: string; password: string };

export type AuthResult = { token: string; error: string };

export type VerifyReponse = {
    account: string;
};
