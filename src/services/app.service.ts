import { GoogleGenAI, Type } from '@google/genai';
import { Injectable, OnModuleInit } from '@nestjs/common';
import createPrompt from './promt';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class AppService implements OnModuleInit {
  AI: GoogleGenAI;
  onModuleInit() {
    const apiKey = process.env.KEY;
    console.log('GEMINI_API_KEY exists:', !!apiKey);
    this.AI = new GoogleGenAI({ apiKey: apiKey })
    console.log('AI initialized:', !!this.AI);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudApiKey = process.env.CLOUDINARY_API_KEY;
    const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;

    cloudinary.config({
      cloud_name: cloudName,
      api_key: cloudApiKey,
      api_secret: cloudApiSecret,
    });

    console.log('CLOUDINARY ENV:', {
      cloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: !!process.env.CLOUDINARY_API_KEY,
      apiSecret: !!process.env.CLOUDINARY_API_SECRET,
      folder: process.env.FOLDERNAME,
    });
  }



  async postArticle(data: any, images: Express.Multer.File[]): Promise<any> {

    const text = `
    Title: ${data.title}
    Keyword: ${data.keyword}
    Content: ${data.content}
    Tone: ${data.tone}
    Language: ${data.language}
    WordCount: ${data.wordCount}
    `

    // console.log("LOG: ", data);
    let imageUrls: string[] = []

    const imageUrlsList = JSON.parse(data.imageUrlsList ?? "[]");
    if (imageUrlsList.length > 0) {
      console.log("LENGTH > 0")
      if (data.changeFile === 'true') {
        console.log("CHANGE FILE TRUE")
        await this.deleteImages(imageUrlsList);
        const uploadedImages = await this.uploadImage(images);
        imageUrls = uploadedImages.map((image: UploadApiResponse) => image.secure_url);
      } else {
        imageUrls = imageUrlsList;
      }
    } else {
      const uploadedImages = await this.uploadImage(images);
      imageUrls = uploadedImages.map((image: UploadApiResponse) => image.secure_url);
    }


    console.log("IMAGE URLS: ", imageUrls)



    const formatText = await createPrompt(text, imageUrls);

    const result = await this.AI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        text: formatText,
      }
        // ,
        // ...this.imagesAI(images),
      ],
    });
    const rawText = result.text || '{}';

    const cleanText = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    try {
      return {
        resultData: JSON.parse(cleanText),
        image_urls: imageUrls
      };
    } catch (error) {
      console.error("ERROR: ", error);

      return {
        resultData: {
          seo_title: '',
          meta_description: '',
          slug: '',
          article_html: '<div>Invalid AI JSON response</div>',
          image_alt_texts: [],
          faqs: [],
        },
        image_urls: []
      };
    }
  }
  async uploadImage(images: Express.Multer.File[]): Promise<UploadApiResponse[]> {
    if (!images || images.length === 0) {
      throw new Error('No images provided');
    }

    const folderName = process.env.FOLDERNAME || 'auto-article-folder';

    const uploadOne = (image: Express.Multer.File): Promise<UploadApiResponse> => {
      console.log('UPLOAD FILE:', {
        originalname: image.originalname,
        mimetype: image.mimetype,
        size: image.size,
        hasBuffer: !!image.buffer,
      });

      return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            resource_type: 'image',
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              console.error('CLOUDINARY ERROR:', error);
              return reject(error);
            }

            if (!result) {
              return reject(new Error('Cloudinary returned empty result'));
            }

            console.log('UPLOAD SUCCESS:', result.secure_url);
            resolve(result);
          },
        );

        stream.on('error', (error) => {
          console.error('STREAM ERROR:', error);
          reject(error);
        });

        stream.end(image.buffer);
      });
    };

    return Promise.all((images).map(uploadOne));
  }

  async deleteImages(imageUrls: string[]) {
    const deleteOne = async (imageUrl: string) => {
      const parsedUrl = new URL(imageUrl);
      const publicId = parsedUrl.pathname.split('auto-article-folder/').pop()?.split('.')[0];
      if (!publicId) {
        console.warn('Could not extract public ID from URL:', imageUrl);
        return;
      }
      try {
        const result = await cloudinary.uploader.destroy(
          `auto-article-folder/${publicId}`,
          {
            resource_type: 'image',
            invalidate: true
          }
        );
        console.log('Image deleted successfully:', imageUrl);
        console.log('Cloudinary delete result:', result);
      } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
      }
    }
    return Promise.all(imageUrls.map(deleteOne));
  }


  imagesAI(images: Express.Multer.File[]) {
    return Array.from(images).map((image) => ({
      inlineData: {
        mimeType: image.mimetype,
        data: image.buffer.toString("base64"),
      },
    }));
  }
}
