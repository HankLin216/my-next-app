import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

interface DrawerItemList {
    Label: string;
    to?: string;
    subList?: DrawerItemList[];
}
export default (req: NextApiRequest, res: NextApiResponse): void => {
    const filePath = path.resolve("./public", "drawer.json");
    const _drawerItemList = fs.readFileSync(filePath, "utf8");
    const drawerItemList: DrawerItemList[] = JSON.parse(_drawerItemList);

    res.statusCode = 200;
    res.json(drawerItemList);
};
