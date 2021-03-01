import { getMySqlConfig } from "@lib/server/getDBConfig";
import { GetResult } from "model/fetch";
import mysql from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const method = req.method;
    switch (method?.toUpperCase()) {
        case "GET":
            await Get(req, res);
            break;
        default:
            //not allowed method
            res.status(405).end();
            break;
    }
    return;
};

const Get = async (req: NextApiRequest, res: NextApiResponse) => {
    const get_result = new GetResult();
    try {
        const config = getMySqlConfig();
        const conn = await mysql.createConnection(config);
        const [rows, fields] = await conn.execute("Select color from ms.color;");
        conn.end();
        //
        get_result.status = true;
        get_result.message = "success";
        get_result.data = rows as { color: string }[];
    } catch (err) {
        get_result.message = err.message;
    }

    res.json(get_result);
};
