import { LoginPostData } from "@apptypes/auth";
import jwt from "jsonwebtoken";
import mysql, { ConnectionOptions } from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const reqData: LoginPostData = JSON.parse(req.body);
    const account = reqData.account;
    const password = reqData.password;
    //verification
    const config: ConnectionOptions = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
    const conn = await mysql.createConnection(config);

    // eslint-disable-next-line no-unused-vars
    const [rows, fileds] = await conn.execute<mysql.RowDataPacket[]>(
        "SELECT password FROM ms.user where `id` = ? ;",
        [account]
    );
    if (rows.length === 0) {
        res.statusCode = 404;
        res.json({ token: "", error: "查無此帳號" });
        return;
    }
    const isValid = rows[0].password === password ? true : false;

    if (!isValid) {
        res.statusCode = 401;
        res.json({ token: "", error: "密碼錯誤!" });
        return;
    }
    //
    if (!process.env.JWT_SECRET) {
        throw new Error("伺服器遺失密鑰");
    }
    if (!process.env.JWT_ALGORITHM) {
        throw new Error("未設定加密演算法");
    }
    const token = jwt.sign({ Account: account }, process.env.JWT_SECRET, {
        algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm
    });
    res.statusCode = 200;
    res.json({ token, error: "" });
    return;
};
