import { PrismaClient } from "../../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaMariaDb({
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
const prisma = new PrismaClient({ adapter });

export default prisma;
