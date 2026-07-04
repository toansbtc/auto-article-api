import { Module } from "@nestjs/common";
import { ArticleController } from "../controllers/article.controller";
import { ArticleService } from "../services/article.service";
import { PrismaService } from "../../prisma/prismaClient";

@Module({
    providers: [ArticleService, PrismaService],
    controllers: [ArticleController],
})
export default class ArticleModule { }