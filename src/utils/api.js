import { parseRSSFeed } from './rssParser.js';

const RSS_URL = 'https://cds.kompas.id/rss/v1/article/list/category/polhuk';

export const fetchLatestArticles = async () => {
  try {
    const articles = await parseRSSFeed(RSS_URL);
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const parseArticle = (article) => ({
  title: article.title,
  description: article.description?.replace(/<[^>]*>/g, '') || '',
  imageUrl: article.mediaContent?.['$']?.url || 'icons/icon128.png',
  url: article.link,
  category: 'Politik & Hukum',
  publishedAt: new Date(article.publishedAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
});