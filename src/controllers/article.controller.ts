import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ArticleService } from "src/services/article.service";

@Controller()
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Post('saveArticle')
    saveArticle(@Body() data: any): Promise<any> {
        return this.articleService.saveArticle(data);
    }

    @Get('getAllArticles')
    getAllArticles(): Promise<any> {
        return this.articleService.getAllArticles();
    }
    @Get('article/:slug')
    async getArticleBySlug(@Param('slug') slug: string): Promise<any> {
        const data = await this.articleService.getArticleById(slug);
        return data
    }
    @Get('getAllArticles')
    getAllArticle(): Promise<any> {
        return this.articleService.getAllArticles();
    }
    @Get('get5Articles')
    get5Articles(): Promise<any> {
        return this.articleService.get5Articles();
    }
    @Get('getAllSlugs')
    getAllSlugs(): Promise<any> {
        return this.articleService.getAllSlugs();
    }
    @Delete('deleteArticle/:id')
    deleteArticle(@Param('id') id: string): Promise<any> {
        return this.articleService.deleteArticle(id);
    }

}