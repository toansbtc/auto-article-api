import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import ArticleModule from './modules/article.module';

@Module({
  imports: [
    ArticleModule,
    ConfigModule.forRoot(
      { isGlobal: true }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
