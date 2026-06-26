import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcrypt';

function parseDbUrl(url) {
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
const prisma_Connector = new PrismaClient({ adapter });

async function main() {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin', saltRounds);

  await prisma_Connector.user.upsert({
    where: { username: 'Admin' },
    update: {},
    create: {
      username: 'Admin',
      password: hashedPassword,
      isAdmin: true,
    },
  });

  console.log('✅ Seed complete: Admin user created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma_Connector.$disconnect();
  });
