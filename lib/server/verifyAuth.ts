import { VerifyReponse } from "@apptypes/auth";
import Cookies from "cookie";
import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

type PropsType = GetServerSidePropsContext;
export const verifyAuth = (ctx: PropsType): VerifyReponse | undefined => {
    try {
        const VerifyReponse: VerifyReponse = {
            account: ""
        };
        //get cookies
        const RawCookies = ctx.req.headers.cookie;
        if (RawCookies !== undefined) {
            const cookies = Cookies.parse(RawCookies);
            //get the user account
            const userAccount = cookies["Account"];
            //get the token
            const token = cookies[userAccount];
            if (process.env.JWT_SECRET === undefined) {
                throw new Error("伺服器遺失密鑰!");
            }
            if (process.env.JWT_ALGORITHM === undefined) {
                throw new Error("伺服器找不到解密演算法!");
            }
            //verify token
            const payload = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: [process.env.JWT_ALGORITHM] as jwt.Algorithm[]
            });
            //compare with account
            if ((payload as { [key: string]: string })["Account"] === userAccount) {
                VerifyReponse.account = userAccount;
                return VerifyReponse;
            }
        }
        if (ctx.resolvedUrl !== "/") {
            ctx.res
                .writeHead(302, {
                    Location: "/"
                })
                .end();
            return;
        }
    } catch (error: unknown) {
        if (ctx.resolvedUrl !== "/") {
            ctx.res
                .writeHead(302, {
                    Location: "/"
                })
                .end();
            return;
        }
    }
};
