import mysql, { ConnectionOptions } from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const config: ConnectionOptions = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
    const conn = await mysql.createConnection(config);

    const [rows, fileds] = await conn.execute("SELECT * FROM ms.user limit 1;");

    res.status(200).json(rows);
};
