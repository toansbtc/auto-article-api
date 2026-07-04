-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "seo_title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "article_html" TEXT NOT NULL,
    "faqs" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
