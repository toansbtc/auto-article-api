import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prismaClient";

@Injectable()
export class ArticleService {

    constructor(private prisma: PrismaService) { }

    // getFirstImageTag(html: string): string | null {
    //     const match = html.match(/<img\b[^>]*>/i);
    //     return match ? match[0] : null;
    // }

    saveArticle(data: any) {
        return this.prisma.article.create({
            data: {
                seo_title: data.resultData.seo_title,
                meta_description: data.resultData.meta_description,
                slug: data.resultData.slug,
                article_html: data.resultData.article_html,
                image_url: JSON.stringify(data.image_urls),
                faqs: JSON.stringify(data.resultData.faqs),
            }
        })
    }
    getAllArticles(): Promise<any> {
        return this.prisma.article.findMany({
            select: {
                id: true,
                seo_title: true,
                meta_description: true,
                image_url: true,
                slug: true,
                updatedAt: true
            }
        });
    }
    get5Articles(): Promise<any> {
        return this.prisma.article.findMany({
            take: 5,
            select: {
                id: true,
                seo_title: true,
                meta_description: true,
                image_url: true,
                slug: true,
            }
        });
    }
    getArticleById(slug: string) {
        return this.prisma.article.findUnique({
            where: {
                slug: slug
            },
            select: {
                id: true,
                seo_title: true,
                meta_description: true,
                article_html: true,
                image_url: true,
                slug: true,
                faqs: true,
            }
        });
    }

    getAllSlugs(): Promise<any> {
        return this.prisma.article.findMany({
            select: {
                slug: true,
                updatedAt: true,
            }
        });
    }

    deleteArticle(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}