import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

function parseDbUrl(url) {
    // mysql://user:pass@host:port/database
    const u = new URL(url);
    return {
        host: u.hostname,
        port: parseInt(u.port || '3306'),
        user: u.username,
        password: u.password,
        database: u.pathname.slice(1),
        connectionLimit: 5,
    };
}

const adapter = new PrismaMariaDb(parseDbUrl(process.env.DATABASE_URL));
export const prisma_Connector = new PrismaClient({ adapter });
