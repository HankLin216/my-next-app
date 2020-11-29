import { getMySqlConfig } from "@lib/server/getDBConfig";
import mysql2 from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
export default (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;
    switch (method?.toUpperCase()) {
        case "GET":
            Get(req, res);
            break;
        default:
            res.status(405).end();
            break;
    }
};

const Get = (req: NextApiRequest, res: NextApiResponse) => {
    const config = getMySqlConfig();

    res.json(["get datalist", "get datalist2"]);
};
