import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { env } from './src/config/env.js';

function parseDbUrl(url) {
    // mysql://user:pass@host:port/database
    const u = new URL(url);
    if (!u.port) {
        throw new Error("DATABASE_URL must include an explicit port.");
    }

    return {
        host: u.hostname,
        port: Number.parseInt(u.port, 10),
        user: u.username,
        password: u.password,
        database: u.pathname.slice(1),
        connectionLimit: 5,
        allowPublicKeyRetrieval: true,
    };
}

const adapter = new PrismaMariaDb(parseDbUrl(env.DATABASE_URL));
export const prisma_Connector = new PrismaClient({ adapter });
