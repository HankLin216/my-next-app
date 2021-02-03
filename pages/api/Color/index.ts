import { getMySqlConfig } from "@lib/server/getDBConfig";
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
    const config = getMySqlConfig();
    const conn = await mysql.createConnection(config);
    const [rows, fields] = await conn.execute("Select color from ms.color;");
    conn.end();
    res.json(rows);
};
