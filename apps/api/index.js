import 'dotenv/config';
import { PrismaClient } from './src/generated/prisma/client.js';

export const prisma_Connector = new PrismaClient();
