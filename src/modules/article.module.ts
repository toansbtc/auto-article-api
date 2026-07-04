import { Module } from "@nestjs/common";
import { ArticleController } from "src/controllers/article.controller";
import { ArticleService } from "src/services/article.service";
import { PrismaService } from "../../prisma/prismaClient";

@Module({
    providers: [ArticleService, PrismaService],
    controllers: [ArticleController],
})
export default class ArticleModule { }