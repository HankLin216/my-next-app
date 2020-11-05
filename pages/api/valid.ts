import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const token = JSON.parse(req.body);
    if (!process.env.JWT_SECRET) {
        throw new Error("伺服器遺失密鑰");
    }
    if (!process.env.JWT_ALGORITHM) {
        throw new Error("未設定加密演算法");
    }

    const vaildResut = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: [process.env.JWT_ALGORITHM as jwt.Algorithm]
    });
    if (vaildResut) {
        res.statusCode = 200;
        res.json({ vaild: true });
    } else {
        res.statusCode = 404;
        res.json({ vaild: false });
    }
};
