import { ConnectionOptions } from "mysql2/promise";

export const getMySqlConfig = (): ConnectionOptions => {
    const config: ConnectionOptions = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };
    return config;
};
