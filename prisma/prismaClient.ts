import { PrismaClient } from "../generated/prisma/client";
import { OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        const adapter = new PrismaPg(pool)

        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
