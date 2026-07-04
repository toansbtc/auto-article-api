import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from '../services/app.service';
import * as fs from 'fs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) { }



  @Post('generate-article')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  postArticle(@Body() data: any, @UploadedFiles() files: { images: Express.Multer.File[] }): Promise<any> {
    console.log("DATA: ", data)
    console.log("files: ", files.images)
    return this.appService.postArticle(data, files.images);
    // return Promise.resolve({ result: "ahihi" })
  }


}
